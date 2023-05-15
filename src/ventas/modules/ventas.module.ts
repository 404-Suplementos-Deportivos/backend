import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { VentasService } from '../services/ventas.service';
import { VentasController } from '../controllers/ventas.controller';

@Module({
  controllers: [VentasController],
  providers: [PrismaService, JwtStrategy, VentasService]
})
export class VentasModule {}
