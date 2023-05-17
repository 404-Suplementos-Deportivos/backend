import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { 
  facturas as FacturaAPI,
  detalles_facturas as DetalleFacturaAPI,
  estados_factura as EstadoFacturaAPI,
  productos as ProductoAPI,
} from '@prisma/client';
import { Comprobante } from '../models/Comprobante';
import { Usuario } from '../models/Usuario';
import { CreateComprobanteDto } from '../dto/createComprobanteDto';
import { DetalleComprobante } from '../models/DetalleComprobante';
import { formatDate, gemerateInvoiceNumber } from 'src/utils/helpers';

@Injectable()
export class VentasService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByUser(idUsuario: number): Promise<any> {
    const comprobantes = await this.prisma.facturas.findMany({
      select: {
        id: true,
        fecha: true,
        fecha_vencimiento: true,
        numero_factura: true,
        id_usuario: false,
        id_estado: false,
        detalles_facturas: {
          select: {
            id: true,
            cantidad: true,
            precio: true,
            descuento: true,
            productos: {
              select: {
                nombre: true,
                url_imagen: true,
              }
            }
          }
        },
        estados_factura: {
          select: {
            nombre: true,
          }
        }

      },
      where: {
        id_usuario: idUsuario,
      },
     
    });
    this.prisma.$disconnect();
    return comprobantes.map(comprobante => {
      return {
        id: comprobante.id,
        fecha: formatDate(comprobante.fecha),
        fechaVencimiento: formatDate(comprobante.fecha_vencimiento),
        numeroFactura: Number(comprobante.numero_factura),
        estadoFactura: comprobante.estados_factura.nombre,
        detalleComprobante: comprobante.detalles_facturas.map(detalle => {
          return {
            id: detalle.id,
            cantidad: Number(detalle.cantidad),
            precio: Number(detalle.precio),
            descuento: Number(detalle.descuento),
            producto: {
              nombre: detalle.productos.nombre,
              urlImagen: detalle.productos.url_imagen,
            }
          } as DetalleComprobante;
        }),
      } as Comprobante;
    });
  }

  async getAllOrders(): Promise<Comprobante[]> {
    const comprobantes = await this.prisma.facturas.findMany({
      select: {
        id: true,
        fecha: true,
        fecha_vencimiento: true,
        numero_factura: true,
        id_usuario: true,
        id_estado: true,
        detalles_facturas: {
          select: {
            id: true,
            cantidad: true,
            precio: true,
            descuento: true,
            id_producto: true,
            productos: {
              select: {
                nombre: true,
                url_imagen: true,
              }
            }
          }
        },
        estados_factura: {
          select: {
            nombre: true,
          }
        },
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          }
        }
      }
    });
    this.prisma.$disconnect();
    return comprobantes.map(comprobante => {
      return {
        id: comprobante.id,
        fecha: formatDate(comprobante.fecha),
        fechaVencimiento: formatDate(comprobante.fecha_vencimiento),
        numeroFactura: Number(comprobante.numero_factura),
        idUsuario: comprobante.id_usuario,
        idEstado: comprobante.id_estado,
        estadoFactura: comprobante.estados_factura.nombre,
        detalleComprobante: comprobante.detalles_facturas.map(detalle => {
          return {
            id: detalle.id,
            cantidad: Number(detalle.cantidad),
            precio: Number(detalle.precio),
            descuento: Number(detalle.descuento),
            idProducto: detalle.id_producto,
            producto: {
              nombre: detalle.productos.nombre,
              urlImagen: detalle.productos.url_imagen,
            }
          } as DetalleComprobante;
        }),
        usuario: {
          nombre: comprobante.usuarios.nombre,
          apellido: comprobante.usuarios.apellido,
          email: comprobante.usuarios.email,
        }
      } as Comprobante;
    });
  }

  async getComprobante(idComprobante: number): Promise<Comprobante> {
    const comprobante = await this.prisma.facturas.findUnique({
      where: {
        id: idComprobante,
      },
      select: {
        id: true,
        fecha: true,
        fecha_vencimiento: true,
        numero_factura: true,
        id_usuario: true,
        id_estado: true,
        detalles_facturas: {
          select: {
            id: true,
            cantidad: true,
            precio: true,
            descuento: true,
            id_producto: true,
            productos: {
              select: {
                nombre: true,
                url_imagen: true,
              }
            }
          }
        },
        estados_factura: {
          select: {
            nombre: true,
          }
        }
      }
    });
    this.prisma.$disconnect();
    return {
      id: comprobante.id,
      fecha: formatDate(comprobante.fecha),
      fechaVencimiento: formatDate(comprobante.fecha_vencimiento),
      numeroFactura: Number(comprobante.numero_factura),
      idUsuario: comprobante.id_usuario,
      idEstado: comprobante.id_estado,
      estadoFactura: comprobante.estados_factura.nombre,
      detalleComprobante: comprobante.detalles_facturas.map(detalle => {
        return {
          id: detalle.id,
          cantidad: Number(detalle.cantidad),
          precio: Number(detalle.precio),
          descuento: Number(detalle.descuento),
          idProducto: detalle.id_producto,
          producto: {
            nombre: detalle.productos.nombre,
            urlImagen: detalle.productos.url_imagen,
          }
        } as DetalleComprobante;
      }),
    } as Comprobante;
  }

  async getProductStock(idProducto: number): Promise<number> {
    const producto = await this.prisma.productos.findUnique({
      where: {
        id: idProducto,
      },
      select: {
        stock: true,
      }
    });
    return producto.stock;
  }

  async create(createComprobanteDto: CreateComprobanteDto, idUsuario: number): Promise<Comprobante> {
    const { detalleComprobante } = createComprobanteDto;
    const fecha = new Date().toISOString();
    const fechaVencimiento = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
    
    const comprobante = await this.prisma.facturas.create({
      data: {
        fecha: fecha,
        fecha_vencimiento: fechaVencimiento,
        // numero_factura: gemerateInvoiceNumber(),
        id_usuario: idUsuario,
        id_estado: 4,
        detalles_facturas: {
          create: detalleComprobante.map(detalle => {
            return {
              cantidad: detalle.cantidad,
              precio: detalle.precio,
              descuento: detalle.descuento,
              id_producto: detalle.idProducto,
            }
          }),
        },
      },
      include: {
        detalles_facturas: true,
        estados_factura: true,
      }
    });
    
    this.prisma.$disconnect();
    return {
      id: comprobante.id,
      fecha: formatDate(comprobante.fecha),
      fechaVencimiento: formatDate(comprobante.fecha_vencimiento),
      numeroFactura: Number(comprobante.numero_factura),
      idUsuario: comprobante.id_usuario,
      idEstado: comprobante.id_estado,
      detalleComprobante: comprobante.detalles_facturas.map(detalle => {
        return {
          id: detalle.id,
          cantidad: detalle.cantidad,
          precio: Number(detalle.precio),
          descuento: detalle.descuento,
          idProducto: detalle.id_producto,
          idComprobante: detalle.id_factura,
        }
      })
    }
  }
  
  async selledProducts(idFactura: number, nroOrden: number): Promise<void> {
    const factura = await this.prisma.facturas.findUnique({
      where: {
        id: idFactura,
      },
      select: {
        detalles_facturas: true,
      }
    });
    const productos = factura.detalles_facturas.map(detalle => {
      return {
        id: detalle.id_producto,
        cantidad: detalle.cantidad,
      }
    })
    for (const producto of productos) {
      await this.prisma.productos.update({
        where: {
          id: producto.id,
        },
        data: {
          stock: {
            decrement: producto.cantidad,
          }
        }
      });
    }
    await this.prisma.facturas.update({
      where: {
        id: idFactura,
      },
      data: {
        id_estado: 1,
        numero_factura: nroOrden,
      }
    });
    this.prisma.$disconnect();
  }

  async getAllClients(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuarios.findMany({
      where: {
        id_rol: 2,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        direccion: true,
        codigo_postal: true,
        telefono: true,
        fecha_nacimiento: true,
        estado: true,
      }
    });
    this.prisma.$disconnect();
    return usuarios.map(usuario => {
      return {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        direccion: usuario.direccion,
        codigoPostal: usuario.codigo_postal,
        telefono: usuario.telefono,
        fechaNacimiento: usuario.fecha_nacimiento && formatDate(usuario.fecha_nacimiento),
        estado: usuario.estado,
      } as Usuario;
    })
  }
}
