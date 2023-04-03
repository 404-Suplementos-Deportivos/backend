import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from './users.service'
import { CreateUserDto, createUserSchema } from './dto/create-user.dto'

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
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.getUser(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' })

      return res.status(HttpStatus.OK).json(user)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const validatedCreateUserDto = createUserSchema.parse(createUserDto)

      // Validar existencia anterior de email
      const userExists = await this.usersService.getUserByEmail(validatedCreateUserDto.email)
      if(userExists) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario ya existente' })

      const user = await this.usersService.createUser(createUserDto)

      // Enviar mail de confirmación con token
      

      return res.status(HttpStatus.OK).json(user)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
