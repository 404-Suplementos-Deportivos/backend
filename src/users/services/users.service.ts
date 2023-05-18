import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { 
  usuarios as UserModel,
  carrito as CartModel,
  roles as RolModel
} from '@prisma/client'
import { User } from '../models/User';
import { Rol } from '../models/Rol';
import { CartDto } from '../dto/CartDto';
import { UserDTO } from '../dto/UserDto';
import { formatDate } from 'src/utils/helpers';
import { encryptPassword } from 'src/utils/auth';

// Extender tipo de datos de UserModel con RolModel
type UserModelComplete = UserModel & {
  roles: RolModel
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getRol(id: number): Promise<Rol> {
    const rol = await this.prisma.roles.findUnique({
      where: {
        id
      }
    });
    this.prisma.$disconnect();
    return rol
  }

  async getRoles(): Promise<Rol[]> {
    const roles = await this.prisma.roles.findMany();
    this.prisma.$disconnect();
    return roles
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.usuarios.findMany({
      orderBy: {
        id: 'asc'
      },
      include: {
        roles: true
      }
    })
    this.prisma.$disconnect();
    return users.map((user: UserModelComplete) => {
      return {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        cuentaConfirmada: user.cuenta_confirmada,
        direccion: user.direccion,
        codigoPostal: user.codigo_postal,
        telefono: user.telefono ? user.telefono : null,
        fechaNacimiento: user.fecha_nacimiento ? formatDate(user.fecha_nacimiento) : null,
        estado: user.estado,
        idRol: user.id_rol,
        rol: {
          id: user.roles.id,
          nombre: user.roles.nombre,
          estado: user.roles.estado,
        }
      } as User
    })
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

  async createUser(data: UserDTO): Promise<UserModel> {
    const user = await this.prisma.usuarios.create({ 
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: await encryptPassword(data.password),
        token_confirmacion: null,
        cuenta_confirmada: false,
        direccion: data.direccion,
        codigo_postal: data.codigoPostal,
        telefono: data.telefono,
        fecha_nacimiento: data.fechaNacimiento,
        id_rol: data.idRol,
      }
    })
    this.prisma.$disconnect();
    return user;
  }

  async updateUser(id: string, data: UserDTO): Promise<UserModel> {
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
        id_rol: data.idRol,
      }
    })
    this.prisma.$disconnect();
    return user;
  }

  async deleteUser(id: string): Promise<UserModel> {
    const user = await this.prisma.usuarios.update({
      where: {
        id: parseInt(id)
      },
      data: {
        estado: false
      }
    })
    this.prisma.$disconnect();
    return user;
  }

  async confirmAccount(id: string): Promise<UserModel> {
    const user = await this.prisma.usuarios.update({
      where: {
        id: parseInt(id)
      },
      data: {
        cuenta_confirmada: true
      }
    })
    this.prisma.$disconnect();
    return user;
  }

  async activateAccount(id: string): Promise<UserModel> {
    const user = await this.prisma.usuarios.update({
      where: {
        id: parseInt(id)
      },
      data: {
        estado: true
      }
    })
    this.prisma.$disconnect();
    return user;
  }

  async getCart(id: number): Promise<CartModel> {
    const cart = await this.prisma.carrito.findUnique({
      where: {
        id_usuario: id
      }
    });
    return cart
  }

  async createCart(cartDTO: CartDto): Promise<CartModel> {
    const cart = await this.prisma.carrito.create({
      data: {
        id_usuario: cartDTO.idUsuario,
        productos: cartDTO.productos
      }
    });
    this.prisma.$disconnect();
    return cart
  }

  async updateCart(cartDTO: CartDto): Promise<CartModel> {
    const cart = await this.prisma.carrito.update({
      where: {
        id_usuario: cartDTO.idUsuario
      },
      data: {
        productos: cartDTO.productos
      }
    });
    this.prisma.$disconnect();
    return cart
  }
}
