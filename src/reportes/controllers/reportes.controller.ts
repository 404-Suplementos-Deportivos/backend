import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Req,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReportesService } from '../services/reportes.service';
import { FechasDto } from '../dto/FechasDto';
import { JwtPayloadModel } from 'src/auth/models/token.model';
import { formatDate } from 'src/utils/helpers';

@UseGuards(JwtAuthGuard)
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('alert-stock-minimo')
  @Roles('Administrador')
  async getAlertStockMinimo(@Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.reportesService.getAlertStockMinimo()
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Get('last-sells')
  @Roles('Administrador')
  async getLastSells(@Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.reportesService.getLastSells()
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Post('last-registers')
  @Roles('Administrador')
  async getCantidadRegistrosMensual(@Body() fechasDto: FechasDto, @Res() res: Response, @Req() req: Request) {
    try {
      if (fechasDto.fechaDesde && fechasDto.fechaHasta) {
        if (new Date(fechasDto.fechaDesde) > new Date(fechasDto.fechaHasta)) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'La fecha desde no puede ser mayor a la fecha hasta',
          })
        }
      }

      fechasDto.fechaDesde ? fechasDto.fechaDesde = new Date(fechasDto.fechaDesde).toISOString() : fechasDto.fechaDesde = new Date(`${new Date().getFullYear()}-01-01`).toISOString()
      fechasDto.fechaHasta ? fechasDto.fechaHasta = new Date(fechasDto.fechaHasta).toISOString() : fechasDto.fechaHasta = new Date(`${new Date().getFullYear()}-12-31`).toISOString()
      const data = await this.reportesService.getCantidadRegistrosMensual(fechasDto)
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Post('last-sells-buys')
  @Roles('Administrador')
  async getLastSellsBuys(@Body() fechasDto: FechasDto, @Res() res: Response, @Req() req: Request) {
    try {
      if (fechasDto.fechaDesde && fechasDto.fechaHasta) {
        if (new Date(fechasDto.fechaDesde) > new Date(fechasDto.fechaHasta)) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'La fecha desde no puede ser mayor a la fecha hasta',
          })
        }
      }

      fechasDto.fechaDesde ? fechasDto.fechaDesde = new Date(fechasDto.fechaDesde).toISOString() : fechasDto.fechaDesde = new Date(`${new Date().getFullYear()}-01-01`).toISOString()
      fechasDto.fechaHasta ? fechasDto.fechaHasta = new Date(fechasDto.fechaHasta).toISOString() : fechasDto.fechaHasta = new Date(`${new Date().getFullYear()}-12-31`).toISOString()
      const data = await this.reportesService.getLastSellsBuys(fechasDto)
      return res.status(HttpStatus.OK).json({
        compras: data.compras,
        ventas: data.ventas
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Post('category-sells')
  @Roles('Administrador')
  async getCategorySells(@Body() fechasDto: FechasDto, @Res() res: Response, @Req() req: Request) {
    try {
      if (fechasDto.fechaDesde && fechasDto.fechaHasta) {
        if (new Date(fechasDto.fechaDesde) > new Date(fechasDto.fechaHasta)) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'La fecha desde no puede ser mayor a la fecha hasta',
          })
        }
      }

      fechasDto.fechaDesde ? fechasDto.fechaDesde = new Date(fechasDto.fechaDesde).toISOString() : fechasDto.fechaDesde = new Date(`${new Date().getFullYear()}-01-01`).toISOString()
      fechasDto.fechaHasta ? fechasDto.fechaHasta = new Date(fechasDto.fechaHasta).toISOString() : fechasDto.fechaHasta = new Date(`${new Date().getFullYear()}-12-31`).toISOString()
      const data = await this.reportesService.getCategorySells(fechasDto)
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Post('most-selled-products')
  @Roles('Administrador')
  async getMostSelledProducts(@Body() fechasDto: FechasDto, @Res() res: Response, @Req() req: Request) {
    try {
      if (fechasDto.fechaDesde && fechasDto.fechaHasta) {
        if (new Date(fechasDto.fechaDesde) > new Date(fechasDto.fechaHasta)) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'La fecha desde no puede ser mayor a la fecha hasta',
          })
        }
      }

      fechasDto.fechaDesde ? fechasDto.fechaDesde = new Date(fechasDto.fechaDesde).toISOString() : fechasDto.fechaDesde = new Date(`${new Date().getFullYear()}-01-01`).toISOString()
      fechasDto.fechaHasta ? fechasDto.fechaHasta = new Date(fechasDto.fechaHasta).toISOString() : fechasDto.fechaHasta = new Date(`${new Date().getFullYear()}-12-31`).toISOString()
      const data = await this.reportesService.getMostSelledProducts(fechasDto)
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Get('tipos-usuario')
  @Roles('Administrador')
  async getTiposUsuario(@Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.reportesService.getTiposUsuario()
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }

  @Get('categorias')
  @Roles('Administrador')
  async getCategorias(@Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.reportesService.getCategorias()
      return res.status(HttpStatus.OK).json({
        data
      })
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error al obtener los datos',
      })
    }
  }
}
