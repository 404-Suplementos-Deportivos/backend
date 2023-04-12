import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { usuarios as UserModel } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    const users = await this.prisma.usuarios.findMany()
    this.prisma.$disconnect();
    return users;
  }

  async getUserById(id: string): Promise<UserModel> {
    const user = await this.prisma.usuarios.findUnique({ 
      where: { 
        id: parseInt(id) 
      },
    })
    this.prisma.$disconnect();
    return user;
  }

  async getUserByEmail(email: string): Promise<number> {
    const user = await this.prisma.usuarios.findUnique({ 
      where: { 
        email 
      },
      select: {
        id: true,
      }
    })
    this.prisma.$disconnect();
    return user?.id || 0;
  }

  async updateUser(id: string, data: any): Promise<UserModel> {
    const user = await this.prisma.usuarios.update({
      where: { 
        id: parseInt(id)
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        direccion: data.direccion,
        codigo_postal: data.codigoPostal,
        telefono: data.telefono,
        fecha_nacimiento: data.fechaNacimiento,
      }
    })
    this.prisma.$disconnect();
    return user;
  }
}
