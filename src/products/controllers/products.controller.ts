import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Res,
  Req,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProductsService } from '../services/products.service';
import { Producto } from '../models/Producto';
import { CreateProductDto } from '../dto/create-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/categories')
  @Public()
  async findAllCategories(@Res() res: Response): Promise<void> {
    try {
      const categories = await this.productsService.findAllCategories()
      res.status(HttpStatus.OK).json(categories)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get('/subcategories/:id')
  @Public()
  async findAllSubCategories(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const subcategories = await this.productsService.findAllSubCategories(id)
      res.status(HttpStatus.OK).json(subcategories)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get()
  @Public()
  async findAllProducts(@Res() res: Response): Promise<void> {
    try {
      const products = await this.productsService.findAllProducts()
      if(!products) throw new Error('No se encontraron productos.')

      res.status(HttpStatus.OK).json(products)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get(':id')
  @Public()
  async findProductById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const product = await this.productsService.findProductById(id)
      if(!product) throw new Error('No se encontró el producto.')

      res.status(HttpStatus.OK).json(product)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post()
  @Roles('Administrador')
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response): Promise<void> {
    try {
      // TODO: Refactorizar pasando al Controller el seteo de datos
      const product = await this.productsService.createProduct(createProductDto)
      if(!product) throw new Error('No se pudo crear el producto.')

      res.status(HttpStatus.CREATED).json({message: 'Producto creado correctamente'})
    } catch (error) {
      console.log( error )
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
