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
import { JwtService } from '@nestjs/jwt'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { MailerService } from '@nestjs-modules/mailer/dist'
import { AuthService } from '../services/auth.service'
import configuration from 'src/config/configuration'
import { RegisterAuthDto, registerAuthSchema } from '../dto/RegisterAuthDto'
import { ForgotPassDto, forgotPassSchema } from '../dto/ForgotPasswordDto'
import { RecuperatePassDto, recuperatePassSchema } from '../dto/RecuperatePassDto'
import { LoginAuthDto, loginAuthSchema } from '../dto/LoginAuthDto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private mailService: MailerService, private jwtService: JwtService) {}

  @Post('register')
  async createUser(@Body() registerAuthDto: RegisterAuthDto, @Res() res: Response) {
    try {
      if(registerAuthDto.fechaNacimiento) registerAuthDto.fechaNacimiento = new Date(registerAuthDto.fechaNacimiento).toISOString()
      const validatedRegisterAuthDto = registerAuthSchema.parse(registerAuthDto)

      // Validar existencia anterior de email
      const userExists = await this.authService.getUserByEmail(validatedRegisterAuthDto.email)
      if(userExists) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario ya existente' })

      const user = await this.authService.createUser(registerAuthDto)

      try {
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
            <a href="${configuration().frontendUrl}/account/confirm-account?token=${user.token_confirmacion}">Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
          `
        })
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
      }
      return res.status(HttpStatus.OK).json({ message: 'Cuenta creada correctamente, revise su correo' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Get('confirm-account/:token')
  async confirmUser(@Param('token') token: string, @Res() res: Response) {
    try {
      const user = await this.authService.getUserByToken(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Token no válido' })

      await this.authService.confirmUser(token)
      return res.status(HttpStatus.OK).json({ message: 'Usuario confirmado' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Token no valido' })
    } finally {
      res.end()
    }
  }

  @Post('confirm-account/reset')
  async resetConfirmUser(@Body() resetTokenRegisterDto: ForgotPassDto, @Res() res: Response) {
    try {
      const validatedResetTokenRegisterDto = forgotPassSchema.parse(resetTokenRegisterDto)

      const user = await this.authService.getUserByEmail(resetTokenRegisterDto.email)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuario no encontrado' })

      if(user.cuenta_confirmada) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario ya confirmado' })

      // Generar token de confirmación
      const token = await this.authService.generateToken(user.id)

      // Enviar mail de confirmación con token
      await this.mailService.sendMail({
        to: user.email,
        from: configuration().nodemailer.auth.user,
        subject: '404 - Confirmar tu cuenta',
        template: 'confirm-account',
        context: {
          nombre: user.nombre,
          token: token,
        },
        text: 'Confirma tu cuenta de 404 y comienza a comprar los mejores suplementos deportivos',
        html: `
          <h1>404 - Confirmar tu cuenta</h1>
          <p>Hola ${user.nombre},</p>
          <p>Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
          <a href="${configuration().frontendUrl}/account/confirm-account?token=${token}">Confirmar Cuenta</a>
          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje.</p>
        `
      })
      return res.status(HttpStatus.OK).json({ message: 'Email enviado correctamente' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
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
          <a href="${configuration().frontendUrl}/account/forgot-password?token=${token}">Restablecer Contraseña</a>
          <p>Si tu no solicitaste restablecer tu contraseña, puedes ignorar el mensaje.</p>
        `
      })

      return res.status(HttpStatus.OK).json({ message: 'Email enviado' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Get('reset/:token')
  async resetPassword (@Param('token') token: string, @Res() res: Response) {
    try {
      const user = await this.authService.getUserByToken(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Token no válido' })

      return res.status(HttpStatus.OK).json({ message: 'Token válido' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Put('reset/:token')
  async updatePassword(@Param('token') token: string, @Body() recuperatePassDto: RecuperatePassDto, @Res() res: Response) {
    try {
      const validatedRecuperatePassDto = recuperatePassSchema.parse(recuperatePassDto)

      const user = await this.authService.getUserByToken(token)
      if(!user) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Token no válido' })

      await this.authService.updatePassword(user.id, validatedRecuperatePassDto.password)
      return res.status(HttpStatus.OK).json({ message: 'Contraseña actualizada' })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    try {
      const validatedLoginAuthDto = loginAuthSchema.parse(loginAuthDto)
      const user = await this.authService.validateUser(loginAuthDto)
      if(!user) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario o contraseña incorrectos' })

      if(!user.cuenta_confirmada) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Debe confirmar su cuenta, revise su corre' }) 

      if(!user.estado) return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Usuario deshabilitado' })

      const userResponse = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.roles.nombre,
      }
      const token = await this.jwtService.signAsync(userResponse)

      return res.status(HttpStatus.OK).json({token})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    } finally {
      res.end()
    }
  }

  // Get Profile mediante JWT
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(req.user)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Su sesión ha expirado' })
    } finally {
      res.end()
    }
  }
}
