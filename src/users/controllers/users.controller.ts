import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Res,
  Req,
  HttpStatus,
  UseGuards,
  Post,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from '../services/users.service';
import { ProductsService } from 'src/products/services/products.service';
import { UserDTO } from '../dto/UserDto'
import { CartDto } from '../dto/CartDto';
import { JwtPayloadModel } from 'src/auth/models/token.model';
import { Cart } from '../models/Cart';
import { formatDate } from 'src/utils/helpers';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private productsService: ProductsService) {}

  // ! Carrito
  @Get('/cart')
  async getCart(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel
      const cart = await this.usersService.getCart(userJwt.id)
      if(!cart) return res.status(HttpStatus.NOT_FOUND).json({ idUsuario: userJwt.id, productos: [] } as Cart)

      const lastProfit = await this.productsService.getLatestProfit()
      if(!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la ganancia.' })

      const productos = JSON.parse(JSON.stringify(cart.productos)).map(async (producto: any) => {
        const product = await this.productsService.findProductById(producto.id_producto.toString())
        if(!(product).estado) return null
        product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)
        return { 
          ...product, 
          cantidad: producto.cantidad 
        }
      })

      const cartResponse: Cart = {
        id: cart.id,
        idUsuario: cart.id_usuario,
        productos: await Promise.all(productos)
      }

      res.status(HttpStatus.OK).json(cartResponse)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }

  @Post('/cart')
  async addToCart(@Body() cartDTO: CartDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userJwt = req.user as JwtPayloadModel
      const cart = await this.usersService.getCart(userJwt.id)

      const lastProfit = await this.productsService.getLatestProfit()
      if(!lastProfit) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró la ganancia.' })

      cartDTO.idUsuario = userJwt.id
      let cartResponse: Cart
      if(cart) {
        // Actualizar arreglo de Productos
        const updatedCart = await this.usersService.updateCart(cartDTO)

        const productos = JSON.parse(JSON.stringify(updatedCart.productos)).map(async (producto: any) => {
          const product = await this.productsService.findProductById(producto.id_producto.toString())
          if(!(product).estado) return null
          product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)
          return { ...product, cantidad: producto.cantidad }
        })

        cartResponse = {
          id: cart.id,
          idUsuario: cart.id_usuario,
          productos: await Promise.all(productos)
        }
      } else {
        // Crear carrito
        const cartCreated = await this.usersService.createCart(cartDTO)

        const productos = JSON.parse(JSON.stringify(cartCreated.productos)).map(async (producto: any) => {
          const product = await this.productsService.findProductById(producto.id_producto.toString())
          if(!(product).estado) return null
          product.precioVenta = product.precioLista + (product.precioLista * lastProfit.porcentaje / 100)
          return { ...product, cantidad: producto.cantidad }
        })

        cartResponse = {
          id: cartCreated.id,
          idUsuario: cartCreated.id_usuario,
          productos: await Promise.all(productos)
        }
      }
      res.status(HttpStatus.OK).json(cartResponse)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }

  @Get()
  @Roles('Administrador')
  async getUsers(@Res() res: Response): Promise<any> {
    try {
      const users = await this.usersService.getUsers();
      if(!users) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No users found' })

      return res.status(HttpStatus.OK).json(users)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const user = await this.usersService.getUserById(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })
      
      const userJwt = req.user as JwtPayloadModel
      if(userJwt.id !== user.id) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Acción Inválida' })

      const userResponse: UserDTO = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        direccion: user.direccion,
        codigoPostal: user.codigo_postal,
        telefono: user.telefono,
        fechaNacimiento: formatDate(user.fecha_nacimiento) // Tipo Date de la BD
      }

      return res.status(HttpStatus.OK).json(userResponse)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserDTO, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      // Convertir Fecha de String a Fecha para la BD
      if(data.fechaNacimiento) data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString()
      const user = await this.usersService.getUserById(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })
      
      const userMail = await this.usersService.getUserByEmail(data.email);
      if(userMail && userMail !== user.id) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El email ya está en uso' })

      const userJwt = req.user as JwtPayloadModel
      if(userJwt.id !== user.id) return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Acción Inválida' })

      const userUpdated = await this.usersService.updateUser(id, data);
      if(!userUpdated) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      const userResponse: UserDTO = {
        id: userUpdated.id,
        nombre: userUpdated.nombre,
        apellido: userUpdated.apellido,
        email: userUpdated.email,
        direccion: userUpdated.direccion,
        codigoPostal: userUpdated.codigo_postal,
        telefono: userUpdated.telefono,
        fechaNacimiento: formatDate(userUpdated.fecha_nacimiento) // Tipo Date de la BD
      }

      return res.status(HttpStatus.OK).json(userResponse)
    } catch (error) {
      console.log( error )
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }
}
