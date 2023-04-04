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
import { MailerService } from '@nestjs-modules/mailer/dist'
import { AuthService } from '../services/auth.service'
import configuration from 'src/config/configuration'
import { CreateUserDto, createUserSchema } from '../dto/create-user.dto'
import { ForgotPassDto, forgotPassSchema } from '../dto/forgot-pass.dto'
import { RecuperatePassDto, recuperatePassSchema } from '../dto/recuperate-pass.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private mailService: MailerService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const validatedCreateUserDto = createUserSchema.parse(createUserDto)

      // Validar existencia anterior de email
      const userExists = await this.authService.getUserByEmail(validatedCreateUserDto.email)
      if(userExists) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario ya existente' })

      const user = await this.authService.createUser(createUserDto)

      // Enviar mail de confirmación con token
      await this.mailService.sendMail({
        to: user.email,
        from: configuration().nodemailer.auth.user,
        subject: '404 - Confirmar tu cuenta',
        template: 'confirm-account',
        context: {
          nombre: user.nombre,
          token: user.token_confirmacion,
        },
        text: 'Confirma tu cuenta de 404 y comienza a comprar los mejores suplementos deportivos',
        html: `
          <h1>404 - Confirmar tu cuenta</h1>
          <p>Hola ${user.nombre},</p>
          <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
          <a href="${configuration().frontendUrl}/confirmar/${user.token_confirmacion}">Confirmar Cuenta</a>
          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
        `
      })

      return res.status(HttpStatus.OK).json({ message: 'Usuario creado correctamente' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get('confirm/:token')
  async confirmUser(@Param('token') token: string, @Res() res: Response) {
    try {
      const user = await this.authService.confirmUser(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      return res.status(HttpStatus.OK).json({ message: 'Usuario confirmado' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassDto: ForgotPassDto, @Res() res: Response) {
    try {
      const validatedForgotPassDto = forgotPassSchema.parse(forgotPassDto)

      const user = await this.authService.getUserByEmail(validatedForgotPassDto.email)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      // Generar token de confirmación
      const token = await this.authService.generateToken(user.id)

      // Enviar mail de confirmación con token
      await this.mailService.sendMail({
        to: user.email,
        from: configuration().nodemailer.auth.user,
        subject: '404 - Restablecer contraseña',
        template: 'forgot-password',
        context: {
          nombre: user.nombre,
          token: token,
        },
        text: 'Restablece tu contraseña de 404',
        html: `
          <h1>404 - Restablecer contraseña</h1>
          <p>Hola ${user.nombre},</p>
          <p>Para restablecer tu contraseña, haz click en el siguiente enlace:</p>
          <a href="${configuration().frontendUrl}/restablecer/${token}">Restablecer Contraseña</a>
          <p>Si tu no solicitaste restablecer tu contraseña, puedes ignorar el mensaje.</p>
        `
      })

      return res.status(HttpStatus.OK).json({ message: 'Email enviado' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get('reset/:token')
  async resetPassword(@Param('token') token: string, @Res() res: Response) {
    try {
      const user = await this.authService.getUserByToken(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      return res.status(HttpStatus.OK).json({ message: 'Token válido' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Patch('reset/:token')
  async updatePassword(@Param('token') token: string, @Body() recuperatePassDto: RecuperatePassDto, @Res() res: Response) {
    try {
      const user = await this.authService.getUserByToken(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      const validatedRecuperatePassSchema = recuperatePassSchema.parse(recuperatePassDto)

      const password = validatedRecuperatePassSchema.password
      if(!password) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Contraseña no enviada' })

      await this.authService.updatePassword(user.id, password)

      return res.status(HttpStatus.OK).json({ message: 'Contraseña actualizada' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // Get Profile mediante JWT
  @Get('profile')
  async getProfile(@Res() res: Response) {
    try {

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
