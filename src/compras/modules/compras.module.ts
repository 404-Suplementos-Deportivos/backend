import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ComprasService } from '../services/compras.service';
import { ComprasController } from '../controllers/compras.controller';

@Module({
  controllers: [ComprasController],
  providers: [PrismaService, JwtStrategy, ComprasService]
})
export class ComprasModule {}
