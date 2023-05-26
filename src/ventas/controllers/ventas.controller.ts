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
import { MailerService } from '@nestjs-modules/mailer/dist'
import configuration from 'src/config/configuration'
import { JwtPayloadModel } from 'src/auth/models/token.model';
import { VentasService } from '../services/ventas.service';
import { CreateComprobanteDto } from '../dto/createComprobanteDto';
import mercadoPago from 'src/utils/mercadoPago';

@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService, private mailService: MailerService) {}

  @Put('change-state/:id')
  @Roles('Administrador')
  async changeState(@Param('id') id: string, @Body() body: { idEstado: number }, @Res() res: Response) {
    try {
      const comprobante = await this.ventasService.getComprobante(Number(id));
      if(comprobante.idEstado === 3 || comprobante.idEstado === 1) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Comprobante cancelado'});

      const result = await this.ventasService.changeState(Number(id), body.idEstado);

      if(body.idEstado === 1) {
        await this.ventasService.selledProducts(comprobante.id, comprobante.numeroFactura);
      }

      // Enviar mail de cambio de estado
      
      return res.status(HttpStatus.OK).json({ message: 'Estado cambiado con éxito' });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al cambiar el estado' });
    }
  }

  @Get('all')
  @Roles('Administrador')
  async getAllOrders(@Res() res: Response) {
    try {
      const result = await this.ventasService.getAllOrders();
      return res.status(HttpStatus.OK).json({ message: 'Comprobantes obtenidos con éxito', data: result });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener los comprobantes' });
    }
  }

  @Get('clientes')
  @Roles('Administrador')
  async getAllClients(@Res() res: Response) {
    try {
      const result = await this.ventasService.getAllClients();
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener los clientes' });
    }
  }

  @Get('estados')
  @Roles('Administrador')
  async getAllStates(@Res() res: Response) {
    try {
      const result = await this.ventasService.getEstados();
      return res.status(HttpStatus.OK).json({ message: 'Estados obtenidos con éxito', data: result });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener los estados' });
    }
  }

  @Get(':id')
  async getStateSell(@Param('id') id: string, @Res() res: Response, @Req() req: Request) {
    try {
      const user = req.user as JwtPayloadModel;
      const mp = await mercadoPago();
      const payment = await mp.payment.get(id);
  
      const comprobante = await this.ventasService.getComprobante(Number(payment.response.external_reference))
      if(comprobante.idEstado === 1) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Comprobante pagado'});
      
      if(payment.body.status === 'approved') {
        await this.ventasService.selledProducts(comprobante.id, Number(id));

        // Crear PDF
        
        // Enviar mail de confirmación de compra con nro de factura y productos
        try {
          await this.mailService.sendMail({
            to: user.email,
            from: configuration().nodemailer.auth.user,
            subject: '404 - Compra realizada',
            template: 'sell-done',
            context: {
              nombre: user.nombre,
              nroFactura: id,
              total: comprobante.detalleComprobante.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0),
            },
            text: 'Gracias por comprar en 404',
            html: `
              <h1>404 - Compra realizada</h1>
              <p>Hola ${user.nombre},</p>
              <p>Gracias por comprar en 404, tu compra se ha realizado con éxito.</p>
              <p>Nro de factura: #${id}</p>
              <p>Productos:</p>
              <ul>
                ${comprobante.detalleComprobante.map(producto => `<li>${producto.cantidad} x ${producto.producto.nombre} - $${producto.precio}</li>`).join('')}
              </ul>
              <p>Total: $${comprobante.detalleComprobante.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0)}</p>
              <p>Si tu no realizaste esta compra, puedes ignorar el mensaje.</p>
            `
          })
        } catch (error) {
          console.log(error);
        }

        return res.status(HttpStatus.OK).json({ message: 'Pago aprobado', data: payment.body.status });
      }

      return res.status(HttpStatus.OK).json({ message: 'Pago rechazado', data: payment.body.status });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener el estado del pago' });
    }
  }

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as JwtPayloadModel;
      const result = await this.ventasService.getAllByUser(user.id);
      return res.status(HttpStatus.OK).json({ message: 'Comprobantes obtenidos con éxito', data: result });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener los comprobantes' });
    }
  }

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
}
