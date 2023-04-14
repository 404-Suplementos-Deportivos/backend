import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ProductsService } from '../services/products.service';
import { ProductsController } from '../controllers/products.controller';


@Module({
  controllers: [ProductsController],
  providers: [PrismaService, JwtStrategy, ProductsService]
})
export class ProductsModule {}
