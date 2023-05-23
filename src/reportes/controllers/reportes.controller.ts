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
      console.log( fechasDto )
      // Validar que la fecha desde no sea mayor a la fecha hasta
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
}
