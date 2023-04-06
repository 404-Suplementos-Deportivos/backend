import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { usuarios as UserModel } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.usuarios.findMany()
  }

  async getUser(id: string): Promise<UserModel> {
    return this.prisma.usuarios.findUnique({ where: { id: parseInt(id) } })
  }
}
