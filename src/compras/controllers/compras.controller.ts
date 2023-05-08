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
import { ComprasService } from '../services/compras.service';
import { CreateProveedorDto } from '../dto/createProveedorDto';

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
}
