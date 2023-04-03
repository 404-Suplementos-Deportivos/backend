import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { usuarios as UserModel } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { encryptPassword } from 'src/utils/auth'
import { generarId } from 'src/utils/generateAuthToken'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserModel[]> {
    return this.prisma.usuarios.findMany()
  }

  async getUser(id: string): Promise<UserModel> {
    return this.prisma.usuarios.findUnique({ where: { id: parseInt(id) } })
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    return this.prisma.usuarios.findFirst({ where: { email } })
  }

  async createUser(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.usuarios.create({ 
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: await encryptPassword(data.password),
        token_confirmacion: generarId(),
        direccion: data.direccion,
        codigo_postal: data.codigoPostal,
        telefono: data.telefono,
        fecha_nacimiento: data.fechaNacimiento,
      }
    })
  }
}
