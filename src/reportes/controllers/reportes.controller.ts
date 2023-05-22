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

}
