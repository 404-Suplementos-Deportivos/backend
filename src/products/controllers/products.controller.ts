import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Res,
  Req,
  Query,
  HttpStatus,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProductsService } from '../services/products.service';
import { Producto } from '../models/Producto';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProfitDto } from '../dto/createProfitDto';
import { JwtPayloadModel } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  // TODO: Orden de Prioridad de Rutas
  constructor(private readonly productsService: ProductsService) {}

  // ! Subcategorias
  @Get('/subcategories/:id')
  @Public()
  async findAllSubCategories(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const subcategories = await this.productsService.findAllSubCategories(id)
      if(!subcategories) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron subcategorias.' }) 

      res.status(HttpStatus.OK).json(subcategories)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Categorias
  @Get('/categories')
  @Public()
  async findAllCategories(@Res() res: Response): Promise<any> {
    try {
      const categories = await this.productsService.findAllCategories()
      if(!categories) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron categorias.' })
      
      res.status(HttpStatus.OK).json(categories)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Ganancias
  @Get('/profits')
  @Public()
  async getProfits(@Res() res: Response): Promise<any> {
    try {
      const profits = await this.productsService.getProfits()
      if(!profits) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontraron ganancias.' })

      res.status(HttpStatus.OK).json(profits)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post('/profits')
  @Roles('Administrador')
  async createProfit(@Body() profit: CreateProfitDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel
      profit.idUsuario = userJwt.id
      profit.vigencia = new Date(profit.vigencia).toISOString()
      const newProfit = await this.productsService.createProfit(profit)
      if(!newProfit) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error al crear la ganancia.' })

      res.status(HttpStatus.CREATED).json(newProfit)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Productos
  @Get(':id')
  @Public()
  async findProductById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const product = await this.productsService.findProductById(id)
      if(!product) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el producto.' })

      const lastProfit = await this.productsService.getLatestProfit()
      if(!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la ganancia.' })

      product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)

      res.status(HttpStatus.OK).json(product)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get()
  @Public()
  async findAllProducts(
    @Query('categoria') categoria: string,
    @Query('subcategoria') subcategoria: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      const products = await this.productsService.findAllProductsFilters(categoria, subcategoria);
      if (!products) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Error al obtener los productos.' });
  
      const lastProfit = await this.productsService.getLatestProfit();
      if (!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Error al obtener la ganancia.' });
  
      products.forEach(product => {
        product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)
      });
  
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Delete('/profits/:id')
  @Roles('Administrador')
  async deleteProfit(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const deletedProfit = await this.productsService.deleteProfit(id)
      if(!deletedProfit) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error al eliminar la ganancia.' })

      res.status(HttpStatus.OK).json({message: 'Ganancia eliminada.'})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post()
  @Roles('Administrador')
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response): Promise<any> {
    try {
      // TODO: Refactorizar pasando al Controller el seteo de datos
      const product = await this.productsService.createProduct(createProductDto)
      if(!product) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error al crear el producto.' })

      res.status(HttpStatus.CREATED).json({message: 'Producto creado correctamente'})
    } catch (error) {
      console.log( error )
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
