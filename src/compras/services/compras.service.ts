import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { 
  proveedores as ProveedorAPI,
  tipos_iva as TipoIvaAPI,
  productos_proveedores as ProductoProveedorAPI,
} from '@prisma/client';
import { Proveedor } from '../models/Proveedor';
import { TipoIVA } from '../models/TipoIVA';
import { CreateProveedorDto } from '../dto/createProveedorDto';

@Injectable()
export class ComprasService {
  constructor(private readonly prisma: PrismaService) {}

  async getProveedores(): Promise<Proveedor[]> {
    const proveedores = await this.prisma.proveedores.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        tipos_iva: true,
      },
    });
    this.prisma.$disconnect();
    return proveedores.map(proveedor => {
      return {
        id: proveedor.id,
        nombre: proveedor.nombre,
        email: proveedor.email,
        telefono: proveedor.telefono ? proveedor.telefono : null,
        direccion: proveedor.direccion,
        codigoPostal: Number(proveedor.codigo_postal),
        estado: proveedor.estado,
        tipoIva: {
          id: proveedor.tipos_iva.id,
          nombre: proveedor.tipos_iva.nombre,
          descripcion: proveedor.tipos_iva.descripcion,
          estado: proveedor.tipos_iva.estado,
        }
      }
    })
  }

  async getProveedor(id: number): Promise<Proveedor> {
    const proveedor = await this.prisma.proveedores.findFirst({
      where: {
        id: id,
      },
      include: {
        tipos_iva: true,
      },
    });
    this.prisma.$disconnect();
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono ? proveedor.telefono : null,
      direccion: proveedor.direccion,
      codigoPostal: Number(proveedor.codigo_postal),
      estado: proveedor.estado,
      tipoIva: {
        id: proveedor.tipos_iva.id,
        nombre: proveedor.tipos_iva.nombre,
        descripcion: proveedor.tipos_iva.descripcion,
        estado: proveedor.tipos_iva.estado,
      }
    }
  }

  async getProveedorByEmail(email: string): Promise<ProveedorAPI> {
    const proveedor = await this.prisma.proveedores.findFirst({
      where: {
        email: email,
      }
    });
    this.prisma.$disconnect();
    return proveedor
  }

  async createProveedor(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.prisma.proveedores.create({
      data: {
        nombre: createProveedorDto.nombre,
        email: createProveedorDto.email,
        telefono: createProveedorDto.telefono ? createProveedorDto.telefono : null,
        direccion: createProveedorDto.direccion,
        codigo_postal: createProveedorDto.codigoPostal,
        estado: true,
        id_tipo_iva: createProveedorDto.tipoIvaId
      },
      include: {
        tipos_iva: true,
      },
    });
    this.prisma.$disconnect();
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono ? proveedor.telefono : null,
      direccion: proveedor.direccion,
      codigoPostal: Number(proveedor.codigo_postal),
      estado: proveedor.estado,
      tipoIva: {
        id: proveedor.tipos_iva.id,
        nombre: proveedor.tipos_iva.nombre,
        descripcion: proveedor.tipos_iva.descripcion,
        estado: proveedor.tipos_iva.estado,
      }
    }
  }

  async updateProveedor(id: number, createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const proveedor = await this.prisma.proveedores.update({
      where: {
        id: id,
      },
      data: {
        nombre: createProveedorDto.nombre,
        email: createProveedorDto.email,
        telefono: createProveedorDto.telefono ? createProveedorDto.telefono : null,
        direccion: createProveedorDto.direccion,
        codigo_postal: createProveedorDto.codigoPostal,
        estado: true,
        id_tipo_iva: createProveedorDto.tipoIvaId
      },
      include: {
        tipos_iva: true,
      },
    });
    this.prisma.$disconnect();
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono ? proveedor.telefono : null,
      direccion: proveedor.direccion,
      codigoPostal: Number(proveedor.codigo_postal),
      estado: proveedor.estado,
      tipoIva: {
        id: proveedor.tipos_iva.id,
        nombre: proveedor.tipos_iva.nombre,
        descripcion: proveedor.tipos_iva.descripcion,
        estado: proveedor.tipos_iva.estado,
      }
    }
  }

  async deleteProveedor(id: number): Promise<Proveedor> {
    // Colocar estado proveedor en false y colocar en false todos los productos_proveedores asociados
    const proveedor = await this.prisma.proveedores.update({
      where: {
        id: id,
      },
      data: {
        estado: false,
        productos_proveedores: {
          updateMany: {
            where: {
              id_proveedor: id,
            },
            data: {
              estado: false,
            }
          }
        }
      },
      include: {
        tipos_iva: true,
      },
    });
    this.prisma.$disconnect();
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono ? proveedor.telefono : null,
      direccion: proveedor.direccion,
      codigoPostal: Number(proveedor.codigo_postal),
      estado: proveedor.estado,
      tipoIva: {
        id: proveedor.tipos_iva.id,
        nombre: proveedor.tipos_iva.nombre,
        descripcion: proveedor.tipos_iva.descripcion,
        estado: proveedor.tipos_iva.estado,
      }
    }
  }

  async getTiposIVA(): Promise<TipoIVA[]> {
    const tiposIVA = await this.prisma.tipos_iva.findMany();
    this.prisma.$disconnect();
    return tiposIVA.map(tipoIVA => {
      return {
        id: tipoIVA.id,
        nombre: tipoIVA.nombre,
        descripcion: tipoIVA.descripcion,
        estado: tipoIVA.estado,
      }
    })
  }
}
