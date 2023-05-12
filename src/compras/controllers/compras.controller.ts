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
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtPayloadModel } from 'src/auth/models/token.model';
import { ComprasService } from '../services/compras.service';
import { CreateProveedorDto } from '../dto/createProveedorDto';
import { CreateNotaPedidoDto } from '../dto/createNotaPedidoDto';
import { UpdateNotaPedidoDto } from '../dto/updateNotaPedidoDto';
import { ChangeEstadoNotaPedidoDto } from '../dto/changeEstadoNotaPedidoDto';

@UseGuards(JwtAuthGuard)
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  // ! Proveedores - Obtener Proveedor por ID
  @Get('/proveedores/:id')
  @Roles('Administrador')
  async getProveedor(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {
      const proveedor = await this.comprasService.getProveedor(Number(id));
      if(!proveedor) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el proveedor' });

      res.status(HttpStatus.OK).json(proveedor);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener proveedor' });
    }
  }

  // ! Proveedores - Actualizar Proveedor
  @Put('/proveedores/:id')
  @Roles('Administrador')
  async updateProveedor(@Res() res: Response, @Req() req: Request, @Param('id') id: string, @Body() updateProveedorDto: CreateProveedorDto) {
    try {
      const proveedor = await this.comprasService.getProveedor(Number(id));
      if(!proveedor) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el proveedor' });

      const proveedorActualizado = await this.comprasService.updateProveedor(Number(id), updateProveedorDto);
      if(!proveedorActualizado) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar proveedor' });

      res.status(HttpStatus.OK).json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar proveedor' });
    }
  }

  // ! Proveedores - Eliminar Proveedor
  @Delete('/proveedores/:id')
  @Roles('Administrador')
  async deleteProveedor(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {
      const proveedor = await this.comprasService.getProveedor(Number(id));
      if(!proveedor) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el proveedor' });

      const proveedorEliminado = await this.comprasService.deleteProveedor(Number(id));
      if(!proveedorEliminado) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al eliminar proveedor' });

      res.status(HttpStatus.OK).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al eliminar proveedor' });
    }
  }

  // ! Notas de Pedido - Actualizar Estado de Nota de Pedido
  @Put('/notas-pedido/:id')
  @Roles('Administrador')
  async changeEstadoNotaPedido(@Res() res: Response, @Req() req: Request, @Param('id') id: string, @Body() changeEstadoNotaPedidoDto: ChangeEstadoNotaPedidoDto) {
    try {
      const notaPedido = await this.comprasService.getNotaPedido(Number(id));
      if(!notaPedido) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la nota de pedido' });

      if(notaPedido.estadoNPId === 3 || notaPedido.estadoNPId === 4) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se puede actualizar el estado de una nota de pedido que ya fue anulada o recibida' });

      if(changeEstadoNotaPedidoDto.estadoNPId === 3) {
        notaPedido.detalleNotaPedido.forEach(async (detalle: any) => {
          const producto = await this.comprasService.addItemToInventory(detalle.productoId, detalle.cantidadPedida);
        });
      }

      const notaPedidoActualizada = await this.comprasService.changeEstadoNotaPedido(Number(id), changeEstadoNotaPedidoDto);
      if(!notaPedidoActualizada) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar estado de nota de pedido' });

      res.status(HttpStatus.OK).json({ message: 'Estado de nota de pedido actualizado correctamente' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar estado de nota de pedido' });
    }
  }

  // ! Productos x Proveedor - Obtener todos los Productos x Proveedor
  @Get('/productos-proveedor/:id')
  @Roles('Administrador')
  async getProductosXProveedor(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {
      const productosXProveedor = await this.comprasService.getProductosProveedor(Number(id));
      if(!productosXProveedor) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron productos x proveedor' });

      res.status(HttpStatus.OK).json(productosXProveedor);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener productos x proveedor' });
    }
  }

  // ! Proveedores - Obtener todos los Proveedores
  @Get('/proveedores')
  @Roles('Administrador')
  async getProveedores(@Res() res: Response, @Req() req: Request) {
    try {
      const proveedores = await this.comprasService.getProveedores();
      if(!proveedores) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron proveedores' });

      res.status(HttpStatus.OK).json(proveedores);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener proveedores' });
    }
  }

  // ! Proveedores - Crear Proveedor
  @Post('/proveedores')
  @Roles('Administrador')
  async createProveedor(@Res() res: Response, @Req() req: Request, @Body() createProveedorDto: CreateProveedorDto) {
    try {
      const proveedorExistente = await this.comprasService.getProveedorByEmail(createProveedorDto.email);
      if(proveedorExistente) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ya existe un proveedor con ese email' });

      const proveedor = await this.comprasService.createProveedor(createProveedorDto);
      if(!proveedor) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo crear el proveedor' });

      res.status(HttpStatus.CREATED).json({message: 'Proveedor creado correctamente'});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear proveedor' });
    }
  }

  // ! Tipos de IVA - Obtener todos los Tipos de IVA
  @Get('/tipos-iva')
  @Roles('Administrador')
  async getTiposIVA(@Res() res: Response, @Req() req: Request) {
    try {
      const tiposIVA = await this.comprasService.getTiposIVA();
      if(!tiposIVA) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron tipos de IVA' });

      res.status(HttpStatus.OK).json(tiposIVA);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener tipos de IVA' });
    }
  }

  // ! Estados de Notas Pedido - Obtener todos los Estados de Notas de Pedido
  @Get('/estados-np')
  @Roles('Administrador')
  async getEstadosNP(@Res() res: Response, @Req() req: Request) {
    try {
      const estadosNP = await this.comprasService.getEstadosNP();
      if(!estadosNP) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron estados de notas de pedido' });

      res.status(HttpStatus.OK).json(estadosNP);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener estados de notas de pedido' });
    }
  }

  // ! Notas de Pedido - Obtener Nota de Pedido por ID
  @Get(':id')
  @Roles('Administrador')
  async getNotaPedido(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {
      const notaPedido = await this.comprasService.getNotaPedido(Number(id));
      if(!notaPedido) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la nota de pedido' });

      res.status(HttpStatus.OK).json(notaPedido);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener nota de pedido' });
    }
  }

  // ! Notas de Pedido - Actualizar Nota de Pedido
  @Put(':id')
  @Roles('Administrador')
  async updateNotaPedido(@Res() res: Response, @Req() req: Request, @Param('id') id: string, @Body() updateNotaPedidoDto: UpdateNotaPedidoDto) {
    try {
      const notaPedido = await this.comprasService.getNotaPedido(Number(id));
      if(!notaPedido) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la nota de pedido' });

      if(notaPedido.estadoNP !== 'PEND_ACEPTACION') return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se puede modificar una nota de pedido que no esté en estado PEND_ACEPTACION' });
      updateNotaPedidoDto.version = Number(notaPedido.version) + 1;

      const notaPedidoActualizada = await this.comprasService.updateNotaPedido(Number(id), updateNotaPedidoDto);
      if(!notaPedidoActualizada) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar nota de pedido' });

      res.status(HttpStatus.OK).json({ message: 'Nota de pedido actualizada correctamente' });
    } catch (error) {
      console.log( error )
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al actualizar nota de pedido' });
    }
  }
  
  // ! Notas de Pedido - Obtener todas las Notas de Pedido
  @Get()
  @Roles('Administrador')
  async getNotasPedido(@Res() res: Response, @Req() req: Request) {
    try {
      const notasPedido = await this.comprasService.getNotasPedido();
      if(!notasPedido) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron notas de pedido' });

      res.status(HttpStatus.OK).json(notasPedido);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener notas de pedido' });
    }
  }

  // ! Notas de Pedido - Crear Nota de Pedido
  @Post()
  @Roles('Administrador')
  async createNotaPedido(@Res() res: Response, @Req() req: Request, @Body() createNotaPedidoDto: CreateNotaPedidoDto) {
    try {
      const userJwt = req.user as JwtPayloadModel

      createNotaPedidoDto.usuarioId = userJwt.id;
      createNotaPedidoDto.version = 1;

      const notaPedido = await this.comprasService.createNotaPedido(createNotaPedidoDto);
      if(!notaPedido) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo crear la nota de pedido' });

      res.status(HttpStatus.CREATED).json({message: 'Nota de pedido creada correctamente'});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear nota de pedido' });
    }
  }
}
