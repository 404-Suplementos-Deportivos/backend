import { Module } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { UsersController } from '../controllers/users.controller'
import { UsersService } from '../services/users.service'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService]
})
export class UsersModule {}
