import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { 
  productos as ProductoAPI,
} from '@prisma/client'
import { FechasDto } from '../dto/FechasDto'
import { formatDate } from 'src/utils/helpers'

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlertStockMinimo(): Promise<any> {
    const productos = await this.prisma.productos.findMany({
      select: {
        id: true,
        nombre: true,
        stock: true,
        stock_minimo: true,
      }
    })
    const productosAlerta = productos.filter((producto: ProductoAPI) => {
      return producto.stock <= producto.stock_minimo
    })
    return productosAlerta    
  }

  async getLastSells(): Promise<any> {
    const ordenes = await this.prisma.facturas.findMany({
      where: {
        fecha: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        },
        id_estado: 1
      },
      orderBy: {
        fecha: 'desc'
      },
      take: 5,
      select: {
        numero_factura: true,
        fecha: true,
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
          }
        },
        estados_factura: {
          select: {
            nombre: true
          }
        },
        detalles_facturas: {
          select: {
            cantidad: true,
            precio: true,
          }
        }
      }
    })
    return ordenes.map((orden: any) => {
      return {
        numero_factura: Number(orden.numero_factura),
        fecha: formatDate(orden.fecha),
        usuario: `${orden.usuarios.nombre} ${orden.usuarios.apellido}`,
        estado: orden.estados_factura.nombre,
        total: orden.detalles_facturas.reduce((acc: number, curr: any) => {
          return acc + (curr.cantidad * curr.precio)
        }, 0)
      }
    })
  }

  async getCantidadRegistrosMensual(fechasDto: FechasDto): Promise<any> {
    const { fechaDesde, fechaHasta } = fechasDto
  
    const cantidadUsuariosMensual: any = await this.prisma.$queryRaw`
      SELECT 
        to_char(date_trunc('month', fecha_creacion), 'MM') AS mes,
        to_char(date_trunc('year', fecha_creacion), 'YYYY') AS anio,
        CAST(COUNT(*) AS INTEGER) AS cantidad_usuarios
      FROM usuarios
      WHERE fecha_creacion >= ${new Date(fechaDesde)}
      AND fecha_creacion <= ${new Date(fechaHasta)}
      GROUP BY mes, anio
    `;

    const result = []
    for(let i = 0; i < 12; i++) {
      const mes = i < 9 ? `0${i + 1}` : `${i + 1}`
      const cantidad = cantidadUsuariosMensual.find((item: any) => item.mes === mes)
      result.push({
        mes,
        cantidadUsuarios: cantidad ? cantidad.cantidad_usuarios : 0
      })
    }
    return result
  }
}
