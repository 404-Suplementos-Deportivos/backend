import { Module } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { UsersController } from '../controllers/users.controller'
import { UsersService } from '../services/users.service'
import { ProductsService } from 'src/products/services/products.service'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, ProductsService]
})
export class UsersModule {}
