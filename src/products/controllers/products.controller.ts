import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Res,
  Req,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProductsService } from '../services/products.service';
import { Producto } from '../models/Producto';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProfitDto } from '../dto/createProfitDto';
import { CreateCategoryDto } from '../dto/createCategoryDto';
import { CreateSubcategoryDto } from '../dto/createSubcategoryDto';
import { JwtPayloadModel } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  // TODO: Orden de Prioridad de Rutas
  constructor(private readonly productsService: ProductsService) {}

  // ! Categorias - PUT
  @Put('/categories/:id')
  @Roles('Administrador')
  async updateCategory(@Param('id') id: string, @Body() category: CreateCategoryDto, @Res() res: Response): Promise<any> {
    try {
      const updatedCategory = await this.productsService.updateCategory(id, category)
      if(!updatedCategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo actualizar la categoria.' })

      res.status(HttpStatus.OK).json({ message: 'Categoría actualizada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Categorias - DELETE
  @Delete('/categories/:id')
  @Roles('Administrador')
  async deleteCategory(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const category = await this.productsService.findCategoryById(id)
      if(!category) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la categoria.' })

      const products = await this.productsService.findAllProductsByCategory(id)
      if(products) return res.status(HttpStatus.CONFLICT).json({ message: 'No se puede eliminar la categoria porque tiene productos asociados.' })

      const deletedCategory = await this.productsService.deleteCategory(id)
      if(!deletedCategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo eliminar la categoria.' })

      res.status(HttpStatus.OK).json({ message: 'Categoría eliminada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Subcategorias - GET
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

  // ! Subcategorias - PUT
  @Put('/subcategories/:id')
  @Roles('Administrador')
  async updateSubCategory(@Param('id') id: string, @Body() subcategory: CreateSubcategoryDto, @Res() res: Response): Promise<any> {
    try {
      const updatedSubcategory = await this.productsService.updateSubCategory(id, subcategory)
      if(!updatedSubcategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo actualizar la subcategoria.' })

      res.status(HttpStatus.OK).json({ message: 'Subcategoría actualizada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Subcategorias - DELETE
  @Delete('/subcategories/:id')
  @Roles('Administrador')
  async deleteSubCategory(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const subcategory = await this.productsService.findSubCategoryById(id)
      if(!subcategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la subcategoria.' })

      const products = await this.productsService.findAllProductsBySubCategory(id)
      if(products) return res.status(HttpStatus.CONFLICT).json({ message: 'No se puede eliminar la subcategoria porque tiene productos asociados.' })

      const deletedSubcategory = await this.productsService.deleteSubCategory(id)
      if(!deletedSubcategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo eliminar la subcategoria.' })

      res.status(HttpStatus.OK).json({ message: 'Subcategoría eliminada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Profits - DELETE
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

  // ! Categorias - GET
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

  // ! Categorias - POST
  @Post('/categories')
  @Roles('Administrador')
  async createCategory(@Body() category: CreateCategoryDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel

      const newCategory = await this.productsService.createCategory(category)
      if(!newCategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo crear la categoria.' })

      res.status(HttpStatus.CREATED).json({ message: 'Categoría creada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Subcategorias - POST
  @Post('/subcategories')
  @Roles('Administrador')
  async createSubCategory(@Body() subcategory: CreateSubcategoryDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel
      if(!subcategory.idCategoria) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Debe seleccionar una categoria.' })

      const newSubcategory = await this.productsService.createSubCategory(subcategory)
      if(!newSubcategory) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo crear la subcategoria.' })

      res.status(HttpStatus.CREATED).json({ message: 'Subcategoría creada exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Ganancias - GET
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

  // ! Ganancias - POST
  @Post('/profits')
  @Roles('Administrador')
  async createProfit(@Body() profit: CreateProfitDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel
      profit.idUsuario = userJwt.id
      profit.vigencia = new Date(profit.vigencia).toISOString()

      const lastProfit = await this.productsService.getLatestProfit()
      if(lastProfit) {
        if(lastProfit.vigencia > profit.vigencia) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'La vigencia de la ganancia debe ser mayor a la última ganancia.' })
      }

      const newProfit = await this.productsService.createProfit(profit)
      if(!newProfit) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error al crear la ganancia.' })

      res.status(HttpStatus.CREATED).json(newProfit)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Productos - GET
  @Get(':id')
  @Public()
  async findProductById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const lastProfit = await this.productsService.getLatestProfit()
      if(!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la ganancia.' })

      const product = await this.productsService.findProductById(id)
      if(!product) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el producto.' })

      product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)

      res.status(HttpStatus.OK).json(product)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Productos - PUT
  @Put(':id')
  @Roles('Administrador')
  async updateProduct(@Param('id') id: string, @Body() product: Producto, @Res() res: Response): Promise<any> {
    try {
      const updatedProduct = await this.productsService.updateProduct(id, product)
      if(!updatedProduct) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo actualizar el producto.' })

      res.status(HttpStatus.OK).json({ message: 'Producto actualizado exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Productos - DELETE
  @Delete(':id')
  @Roles('Administrador')
  async deleteProduct(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const deletedProduct = await this.productsService.deleteProduct(id)
      if(!deletedProduct) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo eliminar el producto.' })

      res.status(HttpStatus.OK).json({ message: 'Producto eliminado exitosamente.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // ! Productos - GET
  @Get()
  @Public()
  async findAllProducts(
    @Query('categoria') categoria: string,
    @Query('subcategoria') subcategoria: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      const lastProfit = await this.productsService.getLatestProfit();
      if (!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Error al obtener la ganancia.' });

      const products = await this.productsService.findAllProductsFilters(categoria, subcategoria);
      if (!products) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Error al obtener los productos.' });
  
      products.forEach(product => {
        product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)
      });
  
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  // ! Productos - POST
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
