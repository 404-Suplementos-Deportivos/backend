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
    try {
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

      const result = await this.ventasService.create(createComprobanteDto, user.id);

      // Integrar MercadoPago 
      const preference = {
        // Agregar id de comprobante
        external_reference: result.id.toString(),
        items: createComprobanteDto.detalleComprobante.map(detalle => {
          return {
            id: detalle.idProducto.toString(),
            title: detalle.nombreProducto,
            unit_price: detalle.precio,
            quantity: detalle.cantidad,
            picture_url: 'https://rickandmortyapi.com/api/character/avatar/473.jpeg',
          }
        }),
        back_urls: {
          success: `${configuration().frontendUrl}/account/${user.id}?view=orders`,
          failure: `${configuration().frontendUrl}/account/${user.id}?view=orders`,
          pending: `${configuration().frontendUrl}/account/${user.id}?view=orders`,
        },
        auto_return: 'approved',
        payer: {
          name: user.nombre,
          email: user.email
        }
      };
      const mp = await mercadoPago();
      const response = await mp.preferences.create(preference);
      
      return res.status(HttpStatus.CREATED).json({ message: 'Pedido realizado con éxito', data: result, init_point: response.body.init_point });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al realizar el pedido' });
    }
  }

  @Get(':id')
  async getStateSell(@Param('id') id: string, @Res() res: Response) {
    try {
      const mp = await mercadoPago();
      const payment = await mp.payment.get(id);
  
      const comprobante = await this.ventasService.getComprobante(Number(payment.response.external_reference))
      if(comprobante.id_estado === 1) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Comprobante pagado'});
      
      if(payment.body.status === 'approved') {
        await this.ventasService.selledProducts(comprobante.id, Number(id));
        return res.status(HttpStatus.OK).json({ message: 'Pago aprobado', data: payment.body.status });
      }

      return res.status(HttpStatus.OK).json({ message: 'Pago rechazado', data: payment.body.status });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener el estado del pago' });
    }
  }
}
