import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Req,
  HttpStatus,
  UseGuards,
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

  // ! Usuarios Confirmar Cuenta - GET
  @Get('/confirm-account/:id')
  async confirmAccount(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const user = await this.usersService.getUserById(id)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se encontró el usuario.' })

      const userConfirmed = await this.usersService.confirmAccount(id)
      if(!userConfirmed) return res.status(HttpStatus.NOT_FOUND).json({ message: 'No se pudo confirmar la cuenta.' })
      res.status(HttpStatus.OK).json({ message: 'Cuenta confirmada.' })
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
  }

  // ! Carrito - GET
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

  // ! Carrito - POST
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

  // ! Roles - GET
  @Get('/roles')
  @Roles('Administrador')
  async getRoles(@Res() res: Response): Promise<any> {
    try {
      const roles = await this.usersService.getRoles();
      if(!roles) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Roles no encontrados' })

      return res.status(HttpStatus.OK).json(roles)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // ! Usuario - GET
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
        telefono: user.telefono ? user.telefono : null,
        fechaNacimiento: user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toISOString().split('T')[0] : null,
      }

      return res.status(HttpStatus.OK).json(userResponse)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // ! Usuario - PUT
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserDTO, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      // Convertir Fecha de String a Fecha para la BD
      console.log( data )
      if(data.fechaNacimiento) data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString()
      const user = await this.usersService.getUserById(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })
      
      const userMail = await this.usersService.getUserByEmail(data.email);
      if(userMail && userMail !== user.id) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El email ya está en uso' })

      const userJwt = req.user as JwtPayloadModel
      if(userJwt.id !== user.id && userJwt.rol !== 'Administrador') return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Acción Inválida' })

      const userUpdated = await this.usersService.updateUser(id, data);
      if(!userUpdated) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      const userResponse: UserDTO = {
        id: userUpdated.id,
        nombre: userUpdated.nombre,
        apellido: userUpdated.apellido,
        email: userUpdated.email,
        direccion: userUpdated.direccion,
        codigoPostal: userUpdated.codigo_postal,
        telefono: userUpdated.telefono ? userUpdated.telefono : null,
        fechaNacimiento: userUpdated.fecha_nacimiento ? formatDate(userUpdated.fecha_nacimiento) : null,  // Tipo Date de la BD
      }

      return res.status(HttpStatus.OK).json({ message: 'Usuario actualizado' })
    } catch (error) {
      console.log( error )
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // ! Usuario - DELETE
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const user = await this.usersService.getUserById(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      const userJwt = req.user as JwtPayloadModel
      if(userJwt.id !== user.id && userJwt.rol !== 'Administrador') return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Acción Inválida' })

      if(!user.estado && userJwt.rol === 'Administrador') {
        const userUpdated = await this.usersService.activateAccount(id);
        if(!userUpdated) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

        return res.status(HttpStatus.OK).json({ message: 'Usuario activado' })
      }

      const userDeleted = await this.usersService.deleteUser(id);
      if(!userDeleted) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      return res.status(HttpStatus.OK).json({ message: 'Usuario eliminado' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // ! Usuarios - GET
  @Get()
  @Roles('Administrador')
  async getUsers(@Res() res: Response): Promise<any> {
    try {
      const users = await this.usersService.getUsers();
      if(!users) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuarios no encontrados' })

      return res.status(HttpStatus.OK).json(users)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // ! Usuario - POST
  @Post()
  async createUser(@Body() data: UserDTO, @Res() res: Response): Promise<any> {
    try {
      // Convertir Fecha de String a Fecha para la BD
      if(data.fechaNacimiento) data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString()
      const user = await this.usersService.getUserByEmail(data.email);
      if(user) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El email ya está en uso' })

      const userCreated = await this.usersService.createUser(data);
      if(!userCreated) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se pudo crear el usuario' })

      const userResponse: UserDTO = {
        id: userCreated.id,
        nombre: userCreated.nombre,
        apellido: userCreated.apellido,
        email: userCreated.email,
        direccion: userCreated.direccion,
        codigoPostal: userCreated.codigo_postal,
        telefono: userCreated.telefono ? userCreated.telefono : null,
        fechaNacimiento: userCreated.fecha_nacimiento ? formatDate(userCreated.fecha_nacimiento) : null,  // Tipo Date de la BD
      }

      return res.status(HttpStatus.CREATED).json({ message: 'Usuario creado correctamente' })
    } catch (error) {
      console.log( error )
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }
}
