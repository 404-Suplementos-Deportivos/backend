import {
  Controller,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

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
  async getUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.getUser(id);
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' })

      return res.status(HttpStatus.OK).json(user)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }
}
