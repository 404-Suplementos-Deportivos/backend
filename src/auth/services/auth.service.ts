import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { usuarios as UserModel } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { encryptPassword } from 'src/utils/auth';
import { generarId } from 'src/utils/generateAuthToken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
        id_rol: data.idRol,
      }
    })
  }

  async confirmUser(token: string): Promise<UserModel> {
    return this.prisma.usuarios.update({
      where: { 
        token_confirmacion: token
      },
      data: { 
        token_confirmacion: null,
        cuenta_confirmada: true
      }
    })
  }

  async generateToken(id: number): Promise<string> {
    const updatedUser = await this.prisma.usuarios.update({
      where: { 
        id
      },
      data: { 
        token_confirmacion: generarId(),
      },
      select: {
        token_confirmacion: true
      }
    });
    return updatedUser.token_confirmacion;
  }

  async getUserByToken(token: string): Promise<UserModel> {
    return this.prisma.usuarios.findFirst({ where: { token_confirmacion: token } })
  }

  async updatePassword(id: number, password: string): Promise<UserModel> {
    return this.prisma.usuarios.update({
      where: { 
        id
      },
      data: { 
        password: await encryptPassword(password),
        token_confirmacion: null,
      }
    })
  }
}
