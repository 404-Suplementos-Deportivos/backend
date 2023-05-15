import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Res,
  Req,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtPayloadModel } from 'src/auth/models/token.model';
import { VentasService } from '../services/ventas.service';
import { CreateComprobanteDto } from '../dto/createComprobanteDto';
import configuration from 'src/config/configuration';
import mercadoPago from 'src/utils/mercadoPago';

@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  async create(@Body() createComprobanteDto: CreateComprobanteDto, @Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtPayloadModel;

    // Comprobar stock
    let noStock: boolean = false;
    for (const detalle of createComprobanteDto.detalleComprobante) {
      const stock = await this.ventasService.getProductStock(detalle.idProducto);
      if (stock < detalle.cantidad) {
        noStock = true;
        break; // Salir del bucle si no hay suficiente stock
      }
    }
    if (noStock) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No hay suficiente stock' });

    // Integrar MercadoPago
    const preference = {
      items: createComprobanteDto.detalleComprobante.map(detalle => {
        return {
          id: detalle.idProducto.toString(),
          title: detalle.idProducto.toString(),
          unit_price: detalle.precio,
          quantity: detalle.cantidad,
          picture_url: 'https://rickandmortyapi.com/api/character/avatar/473.jpeg',
        }
      }),
      back_urls: {
        // TODO: Cambiar a URL de producción - VARIABLES DE ENTORNO CONFIG
        success: `${configuration().frontendUrl}/account/${user.id}?view=orders`,
        failure: 'http://localhost:4200/',
        pending: 'http://localhost:4200/',
      },
      auto_return: 'approved',
      payer: {
        name: user.nombre,
        email: 'asda@gmail.com',
      }
    };
    const mp = await mercadoPago();
    const response = await mp.preferences.create(preference);
    console.log(response.body);
    console.log( response.body.init_point )

    const result = await this.ventasService.create(createComprobanteDto, user.id);
    return res.status(HttpStatus.CREATED).json({ message: 'Pedido realizado con éxito', data: result, init_point: response.body.init_point });
  }
}
