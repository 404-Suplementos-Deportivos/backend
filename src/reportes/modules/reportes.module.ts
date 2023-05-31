import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service'
import { ReportesService } from '../services/reportes.service';
import { ReportesController } from '../controllers/reportes.controller';

@Module({
  controllers: [ReportesController],
  providers: [PrismaService, ReportesService]
})
export class ReportesModule {}
