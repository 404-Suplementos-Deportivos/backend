import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import configuration from 'src/config/configuration';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn }
    }),
    MailerModule.forRoot({
      transport: {
        host: configuration().nodemailer.host,
        port: parseInt(configuration().nodemailer.port, 10) || 587,
        auth: {
          user: configuration().nodemailer.auth.user,
          pass: configuration().nodemailer.auth.pass
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [PrismaService, JwtStrategy, AuthService]
})
export class AuthModule {}
