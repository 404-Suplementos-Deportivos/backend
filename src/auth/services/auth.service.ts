import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { usuarios as UserModel } from '@prisma/client';
import { RegisterAuthDto } from '../dto/RegisterAuthDto';
import { LoginAuthDto } from '../dto/LoginAuthDto';
import { encryptPassword, matchPassword } from 'src/utils/auth';
import { generarId } from 'src/utils/generateAuthToken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<UserModel> {
    return this.prisma.usuarios.findUnique({ where: { email } })
  }

  async createUser(data: RegisterAuthDto): Promise<UserModel> {
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
    return this.prisma.usuarios.findUnique({ where: { token_confirmacion: token } })
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

  async validateUser(data: LoginAuthDto): Promise<LoginAuthDto> {
    const user = await this.prisma.usuarios.findUnique({ 
      where: { 
        email: data.email 
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true,
        cuenta_confirmada: true,
        roles: {
          select: {
            nombre: true
          }
        }
      }
    })
    if(user) {
      const match = await matchPassword(data.password, user.password);
      if(match) {
        return user;
      }
    }
    return null;
  }
}
