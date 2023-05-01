import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { 
  categorias as CategoriaAPI,
  subcategorias as SubCategoriaAPI,
  productos as ProductoAPI,
  ganancias as GananciaAPI,
} from '@prisma/client';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProfitDto } from '../dto/createProfitDto';
import { Producto } from '../models/Producto';
import { Categoria } from '../models/Categoria';
import { Subcategoria } from '../models/Subcategoria';
import { Ganancia } from '../models/Ganancia';
import { formatDate } from 'src/utils/helpers';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories(): Promise<Categoria[]> {
    const categorias = await this.prisma.categorias.findMany();
    this.prisma.$disconnect();
    return categorias.map((categoria) => {
      return {
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        estado: categoria.estado,
      };
    })
  }

  async findAllSubCategories(id: string): Promise<Subcategoria[]> {
    const subcategorias = await this.prisma.subcategorias.findMany({
      where: {
        id_categoria: Number(id),
      }
    });
    this.prisma.$disconnect();
    return subcategorias.map((subcategoria) => {
      return {
        id: subcategoria.id,
        nombre: subcategoria.nombre,
        descripcion: subcategoria.descripcion,
        estado: subcategoria.estado,
        idCategoria: subcategoria.id_categoria,
      };
    })
  }

  async findAllProducts(): Promise<Producto[]> {
    const products = await this.prisma.productos.findMany({
      include: {
        categorias: true,
        subcategorias: true,
      },
    });
    this.prisma.$disconnect();
    return products.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        urlImagen: product.url_imagen,
        idCategoria: product.id_categoria,
        idSubCategoria: product.id_subcategoria,
        precioLista: Number(product.precio_lista),
        stock: product.stock,
        stockMinimo: product.stock_minimo,
        estado: product.estado,
        categoria: {
          id: product.categorias.id,
          nombre: product.categorias.nombre,
          descripcion: product.categorias.descripcion,
          estado: product.categorias.estado,
        },
        subcategoria: {
          id: product.subcategorias.id,
          nombre: product.subcategorias.nombre,
          descripcion: product.subcategorias.descripcion,
          estado: product.subcategorias.estado,
          idCategoria: product.subcategorias.id_categoria,
        }
      }
    })
  }

  async findAllProductsFilters(categoria: string, subcategoria: string): Promise<Producto[]> {
    const products = await this.prisma.productos.findMany({
      where: {
        id_categoria: Number(categoria) || undefined,
        id_subcategoria: Number(subcategoria) || undefined,
      },
      include: {
        categorias: true,
        subcategorias: true,
      },
    });
    this.prisma.$disconnect();
    return products.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        urlImagen: product.url_imagen,
        idCategoria: product.id_categoria,
        idSubCategoria: product.id_subcategoria,
        precioLista: Number(product.precio_lista),
        stock: product.stock,
        stockMinimo: product.stock_minimo,
        estado: product.estado,
        categoria: {
          id: product.categorias.id,
          nombre: product.categorias.nombre,
          descripcion: product.categorias.descripcion,
          estado: product.categorias.estado,
        },
        subcategoria: {
          id: product.subcategorias.id,
          nombre: product.subcategorias.nombre,
          descripcion: product.subcategorias.descripcion,
          estado: product.subcategorias.estado,
          idCategoria: product.subcategorias.id_categoria,
        }
      }
    })
  }

  async findProductById(id: string): Promise<Producto> {
    const product = await this.prisma.productos.findUnique({
      where: { id: Number(id) },
      include: {
        categorias: true,
        subcategorias: true,
      },
    });
    this.prisma.$disconnect();
    return {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      urlImagen: product.url_imagen,
      idCategoria: product.id_categoria,
      idSubCategoria: product.id_subcategoria,
      precioLista: Number(product.precio_lista),
      stock: product.stock,
      stockMinimo: product.stock_minimo,
      estado: product.estado,
      categoria: {
        id: product.categorias.id,
        nombre: product.categorias.nombre,
        descripcion: product.categorias.descripcion,
        estado: product.categorias.estado,
      },
      subcategoria: {
        id: product.subcategorias.id,
        nombre: product.subcategorias.nombre,
        descripcion: product.subcategorias.descripcion,
        estado: product.subcategorias.estado,
        idCategoria: product.subcategorias.id_categoria,
      }
    }
  }

  async createProduct(data: CreateProductDto): Promise<ProductoAPI> {
    const response = await this.prisma.productos.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        url_imagen: data.urlImagen,
        id_categoria: data.idCategoria,
        id_subcategoria: data.idSubCategoria,
        precio_lista: data.precioLista,
        stock: data.stock,
        stock_minimo: data.stockMinimo,
      }
    });
    this.prisma.$disconnect();
    return response
  }

  async getProfits(): Promise<Ganancia[]> {
    const profits = await this.prisma.ganancias.findMany();
    this.prisma.$disconnect();
    return profits.map((profit) => {
      return {
        id: profit.id,
        vigencia: formatDate(profit.vigencia),
        porcentaje: Number(profit.porcentaje),
        idUsuario: profit.id_usuario,
      }
    })
  }

  async getLatestProfit(): Promise<Ganancia> {
    const profit = await this.prisma.ganancias.findFirst({
      orderBy: {
        vigencia: 'desc',
      }
    });
    this.prisma.$disconnect();
    return {
      id: profit.id,
      vigencia: formatDate(profit.vigencia),
      porcentaje: Number(profit.porcentaje),
      idUsuario: profit.id_usuario,
    }
  }

  async createProfit(data: CreateProfitDto): Promise<Ganancia> {
    const profit = await this.prisma.ganancias.create({
      data: {
        vigencia: data.vigencia,
        porcentaje: data.porcentaje,
        id_usuario: data.idUsuario
      }
    })
    this.prisma.$disconnect();
    return {
      id: profit.id,
      vigencia: formatDate(profit.vigencia),
      porcentaje: Number(profit.porcentaje),
      idUsuario: profit.id_usuario,
    }
  }

  async deleteProfit(id: string): Promise<Ganancia> {
    const profit = await this.prisma.ganancias.delete({
      where: {
        id: Number(id)
      }
    })
    this.prisma.$disconnect();
    return {
      id: profit.id,
      vigencia: formatDate(profit.vigencia),
      porcentaje: Number(profit.porcentaje),
      idUsuario: profit.id_usuario,
    }
  }
}
