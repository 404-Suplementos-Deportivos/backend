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

    const result = await this.ventasService.create(createComprobanteDto, user.id);
    return res.status(HttpStatus.CREATED).json({ message: 'Pedido realizado con éxito', data: result });
  }
}
