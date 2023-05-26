import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { 
  proveedores as ProveedorAPI,
  tipos_iva as TipoIvaAPI,
  productos_proveedores as ProductoProveedorAPI,
} from '@prisma/client';
import { Proveedor } from '../models/Proveedor';
import { TipoIVA } from '../models/TipoIVA';
import { NotaPedido } from '../models/NotaPedido';
import { Producto } from 'src/products/models/Producto';
import { EstadoNP } from '../models/EstadoNP';
import { CreateProveedorDto } from '../dto/createProveedorDto';
import { CreateNotaPedidoDto } from '../dto/createNotaPedidoDto';
import { UpdateNotaPedidoDto } from '../dto/updateNotaPedidoDto';
import { ChangeEstadoNotaPedidoDto } from '../dto/changeEstadoNotaPedidoDto';
import { formatDate } from 'src/utils/helpers';

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

  async getEstadosNP(): Promise<EstadoNP[]> {
    const estadosNP = await this.prisma.estados_np.findMany();
    this.prisma.$disconnect();
    return estadosNP.map(estadoNP => {
      return {
        id: estadoNP.id,
        nombre: estadoNP.nombre,
        estado: estadoNP.estado,
      }
    })
  }


  async getNotasPedido(): Promise<NotaPedido[]> {
    const notasPedido = await this.prisma.notas_pedido.findMany({
      orderBy: {
        fecha: 'desc',
      },
      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        proveedores: {
          select: {
            id: true,
            nombre: true,
            direccion: true,
            email: true,
            telefono: true,
          }
        },
        estados_np: {
          select: {
            id: true,
            nombre: true
          }
        },
        tipos_compra: {
          select: {
            id: true,
            nombre: true
          }
        },
        detalles_np: {
          select:{
            cantidad_pedida: true,
            cantidad_recibida: true,
            precio: true,
            descuento: true,
            estado: true,
            productos: {
              select: {
                id: true,
                nombre: true,
              }
            }
          },
        }
      }
    });
    this.prisma.$disconnect();
    return notasPedido.map((notaPedido) => {
      return {
        id: notaPedido.id,
        fecha: formatDate(notaPedido.fecha),
        version: notaPedido.version,
        fechaVencimiento: formatDate(notaPedido.fecha_vencimiento),
        usuario: notaPedido.usuarios.nombre + ' ' + notaPedido.usuarios.apellido,
        proveedor: notaPedido.proveedores.nombre,
        proveedorDireccion: notaPedido.proveedores.direccion,
        proveedorEmail: notaPedido.proveedores.email,
        proveedorTelefono: notaPedido.proveedores.telefono,
        proveedorId: notaPedido.proveedores.id,
        estadoNP: notaPedido.estados_np.nombre,
        estadoNPId: notaPedido.estados_np.id,
        tipoCompra: notaPedido.tipos_compra.nombre,
        tipoCompraId: notaPedido.tipos_compra.id,
        detalleNotaPedido: notaPedido.detalles_np.map((detalleNotaPedido) => {
          return {
            cantidadPedida: detalleNotaPedido.cantidad_pedida,
            cantidadRecibida: detalleNotaPedido.cantidad_recibida,
            precio: Number(detalleNotaPedido.precio),
            descuento: detalleNotaPedido.descuento,
            estado: detalleNotaPedido.estado,
            producto: detalleNotaPedido.productos.nombre,
            productoId: detalleNotaPedido.productos.id,
          }
        })
      }
    })
  }

  async getNotaPedido(id: number): Promise<NotaPedido> {
    const notaPedido = await this.prisma.notas_pedido.findUnique({
      where: {
        id: id,
      },
      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        proveedores: {
          select: {
            id: true,
            nombre: true
          }
        },
        estados_np: {
          select: {
            id: true,
            nombre: true
          }
        },
        tipos_compra: {
          select: {
            id: true,
            nombre: true
          }
        },
        detalles_np: {
          select:{
            cantidad_pedida: true,
            cantidad_recibida: true,
            precio: true,
            descuento: true,
            estado: true,
            productos: {
              select: {
                id: true,
                nombre: true,
              }
            }
          },
        }
      }
    });
    this.prisma.$disconnect();
    return {
      id: notaPedido.id,
      fecha: formatDate(notaPedido.fecha),
      version: notaPedido.version,
      fechaVencimiento: formatDate(notaPedido.fecha_vencimiento),
      usuario: notaPedido.usuarios.nombre + ' ' + notaPedido.usuarios.apellido,
      proveedor: notaPedido.proveedores.nombre,
      proveedorId: notaPedido.proveedores.id,
      estadoNP: notaPedido.estados_np.nombre,
      estadoNPId: notaPedido.estados_np.id,
      tipoCompra: notaPedido.tipos_compra.nombre,
      tipoCompraId: notaPedido.tipos_compra.id,
      detalleNotaPedido: notaPedido.detalles_np.map((detalleNotaPedido) => {
        return {
          cantidadPedida: detalleNotaPedido.cantidad_pedida,
          cantidadRecibida: detalleNotaPedido.cantidad_recibida,
          precio: Number(detalleNotaPedido.precio),
          descuento: detalleNotaPedido.descuento,
          estado: detalleNotaPedido.estado,
          producto: detalleNotaPedido.productos.nombre,
          productoId: detalleNotaPedido.productos.id,
        }
      })
    }
  }

  async createNotaPedido(notaPedido: CreateNotaPedidoDto): Promise<NotaPedido> {
    const notaPedidoCreada = await this.prisma.notas_pedido.create({
      data: {
        fecha: new Date().toISOString(),
        version: notaPedido.version,
        fecha_vencimiento: new Date(notaPedido.fechaVencimiento).toISOString(),
        id_usuario: notaPedido.usuarioId,
        id_proveedor: notaPedido.proveedorId,
        id_estado_np: 1,
        id_tipo_compra: notaPedido.tipoCompraId,
        detalles_np: {
          create: notaPedido.detalleNotaPedido.map((detalleNotaPedido) => {
            return {
              cantidad_pedida: detalleNotaPedido.cantidadPedida,
              cantidad_recibida: detalleNotaPedido.cantidadRecibida,
              precio: detalleNotaPedido.precio,
              descuento: detalleNotaPedido.descuento,
              id_producto: detalleNotaPedido.productoId,
              estado: true
            }
          })
        }
      },
      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        proveedores: {
          select: {
            nombre: true
          }
        },
        estados_np: {
          select: {
            nombre: true
          }
        },
        tipos_compra: {
          select: {
            nombre: true
          }
        },
        detalles_np: {
          select:{
            cantidad_pedida: true,
            cantidad_recibida: true,
            precio: true,
            descuento: true,
            estado: true,
            productos: {
              select: {
                nombre: true,
              }
            }
          },
        }
      }
    });
    this.prisma.$disconnect();
    return {
      id: notaPedidoCreada.id,
      fecha: formatDate(notaPedidoCreada.fecha),
      version: notaPedidoCreada.version,
      fechaVencimiento: formatDate(notaPedidoCreada.fecha_vencimiento),
      usuario: notaPedidoCreada.usuarios.nombre + ' ' + notaPedidoCreada.usuarios.apellido,
      proveedor: notaPedidoCreada.proveedores.nombre,
      estadoNP: notaPedidoCreada.estados_np.nombre,
      tipoCompra: notaPedidoCreada.tipos_compra.nombre,
      detalleNotaPedido: notaPedidoCreada.detalles_np.map((detalleNotaPedido) => {
        return {
          cantidadPedida: detalleNotaPedido.cantidad_pedida,
          cantidadRecibida: detalleNotaPedido.cantidad_recibida,
          precio: Number(detalleNotaPedido.precio),
          descuento: detalleNotaPedido.descuento,
          estado: detalleNotaPedido.estado,
          producto: detalleNotaPedido.productos.nombre,
        }
      })
    }
  }

  async updateNotaPedido(id: number, notaPedido: UpdateNotaPedidoDto): Promise<NotaPedido> {
    const notaPedidoActualizada = await this.prisma.notas_pedido.update({
      where: {
        id: id
      },
      data: {
        fecha_vencimiento: new Date(notaPedido.fechaVencimiento).toISOString(),
        id_estado_np: notaPedido.estadoNPId,
        id_tipo_compra: notaPedido.tipoCompraId,
        version: notaPedido.version,
        detalles_np: {
          deleteMany: {},
          create: notaPedido.detalleNotaPedido.map((detalleNotaPedido) => {
            return {
              cantidad_pedida: detalleNotaPedido.cantidadPedida,
              cantidad_recibida: detalleNotaPedido.cantidadRecibida,
              precio: detalleNotaPedido.precio,
              descuento: detalleNotaPedido.descuento,
              id_producto: detalleNotaPedido.productoId,
              estado: true
            }
          })
        }
      },
      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        proveedores: {
          select: {
            nombre: true
          }
        },
        estados_np: {
          select: {
            nombre: true
          }
        },
        tipos_compra: {
          select: {
            nombre: true
          }
        },
        detalles_np: {
          select:{
            cantidad_pedida: true,
            cantidad_recibida: true,
            precio: true,
            descuento: true,
            estado: true,
            productos: {
              select: {
                nombre: true,
              }
            }
          },
        }
      }
    });
    this.prisma.$disconnect();
    return {
      id: notaPedidoActualizada.id,
      fecha: formatDate(notaPedidoActualizada.fecha),
      version: notaPedidoActualizada.version,
      fechaVencimiento: formatDate(notaPedidoActualizada.fecha_vencimiento),
      usuario: notaPedidoActualizada.usuarios.nombre + ' ' + notaPedidoActualizada.usuarios.apellido,
      proveedor: notaPedidoActualizada.proveedores.nombre,
      estadoNP: notaPedidoActualizada.estados_np.nombre,
      tipoCompra: notaPedidoActualizada.tipos_compra.nombre,
      detalleNotaPedido: notaPedidoActualizada.detalles_np.map((detalleNotaPedido) => {
        return {
          cantidadPedida: detalleNotaPedido.cantidad_pedida,
          cantidadRecibida: detalleNotaPedido.cantidad_recibida,
          precio: Number(detalleNotaPedido.precio),
          descuento: detalleNotaPedido.descuento,
          estado: detalleNotaPedido.estado,
          producto: detalleNotaPedido.productos.nombre,
        }
      })
    }
  }

  async changeEstadoNotaPedido(notaPedido: NotaPedido, estadoNP: ChangeEstadoNotaPedidoDto): Promise<NotaPedido> {
    const notaPedidoActualizada = await this.prisma.notas_pedido.update({
      where: {
        id: notaPedido.id
      },
      data: {
        id_estado_np: estadoNP.estadoNPId,
      },
      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        proveedores: {
          select: {
            nombre: true
          }
        },
        estados_np: {
          select: {
            nombre: true
          }
        },
        tipos_compra: {
          select: {
            nombre: true
          }
        },
        detalles_np: {
          select:{
            id: true,
            cantidad_pedida: true,
            cantidad_recibida: true,
            precio: true,
            descuento: true,
            estado: true,
            productos: {
              select: {
                nombre: true,
              }
            }
          },
        }
      }
    });
    notaPedidoActualizada.detalles_np.forEach(async (detalleNP) => {
      await this.prisma.detalles_np.update({
        where: {
          id: detalleNP.id
        },
        data: {
          cantidad_recibida: detalleNP.cantidad_pedida
        }
      });
    });
    this.prisma.$disconnect();
    return {
      id: notaPedidoActualizada.id,
      fecha: formatDate(notaPedidoActualizada.fecha),
      version: notaPedidoActualizada.version,
      fechaVencimiento: formatDate(notaPedidoActualizada.fecha_vencimiento),
      usuario: notaPedidoActualizada.usuarios.nombre + ' ' + notaPedidoActualizada.usuarios.apellido,
      proveedor: notaPedidoActualizada.proveedores.nombre,
      estadoNP: notaPedidoActualizada.estados_np.nombre,
      tipoCompra: notaPedidoActualizada.tipos_compra.nombre,
      detalleNotaPedido: notaPedidoActualizada.detalles_np.map((detalleNotaPedido) => {
        return {
          cantidadPedida: detalleNotaPedido.cantidad_pedida,
          cantidadRecibida: detalleNotaPedido.cantidad_recibida,
          precio: Number(detalleNotaPedido.precio),
          descuento: detalleNotaPedido.descuento,
          estado: detalleNotaPedido.estado,
          producto: detalleNotaPedido.productos.nombre,
        }
      })
    }
  }

  async addItemToInventory(idProducto: number, cantidad: number): Promise<any> {
    const producto = await this.prisma.productos.findUnique({
      where: {
        id: idProducto
      }
    });
    const productoActualizado = await this.prisma.productos.update({
      where: {
        id: idProducto
      },
      data: {
        stock: producto.stock + cantidad
      }
    });
    this.prisma.$disconnect();
    return productoActualizado;
  }
        

  async getProductosProveedor(id: number): Promise<any> {
    const productos = await this.prisma.productos_proveedores.findMany({
      where: {
        id_proveedor: id
      },
      select: {
        precio: true,
        productos: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
    this.prisma.$disconnect();
    return productos.map((producto) => {
      return {
        id: producto.productos.id,
        nombre: producto.productos.nombre,
        precio: Number(producto.precio),
      }
    })
  }
}