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
} from '@nestjs/common'
import { Response, Request } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/UserDto'
import { JwtPayloadModel } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
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
  async getUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response, ) {
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
        fechaNacimiento: user.fecha_nacimiento,
      }

      return res.status(HttpStatus.OK).json(userResponse)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserDTO, @Req() req: Request, @Res() res: Response) {
    try {
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
        fechaNacimiento: userUpdated.fecha_nacimiento,
      }

      return res.status(HttpStatus.OK).json(userResponse)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }
}
