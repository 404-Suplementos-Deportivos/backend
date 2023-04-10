import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { usuarios as UserModel } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    const users = this.prisma.usuarios.findMany()
    this.prisma.$disconnect();
    return users;
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = this.prisma.usuarios.findUnique({ 
      where: { 
        id: parseInt(id) 
      },
    })
    this.prisma.$disconnect();
    return user;
  }
}
