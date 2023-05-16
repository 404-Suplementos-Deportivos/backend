import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { 
  facturas as FacturaAPI,
  detalles_facturas as DetalleFacturaAPI,
  estados_factura as EstadoFacturaAPI,
  productos as ProductoAPI,
} from '@prisma/client';
import { Comprobante } from '../models/Comprobante';
import { CreateComprobanteDto } from '../dto/createComprobanteDto';
import { DetalleComprobante } from '../models/DetalleComprobante';
import { formatDate, gemerateInvoiceNumber } from 'src/utils/helpers';

@Injectable()
export class VentasService {
  constructor(private readonly prisma: PrismaService) {}

  async getComprobante(idComprobante: number): Promise<any> {
    const comprobante = await this.prisma.facturas.findUnique({
      where: {
        id: idComprobante,
      },
    });
    this.prisma.$disconnect();
    return comprobante;
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
}
