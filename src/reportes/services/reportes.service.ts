import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma.service'
import { 
  productos as ProductoAPI,
} from '@prisma/client'

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
}
