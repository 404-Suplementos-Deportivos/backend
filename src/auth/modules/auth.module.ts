import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/services/prisma.service';
import configuration from 'src/config/configuration';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: configuration().nodemailer.host,
      port: parseInt(configuration().nodemailer.port, 10) || 587,
      auth: {
        user: configuration().nodemailer.auth.user,
        pass: configuration().nodemailer.auth.pass
      }
    }
  })],
  controllers: [AuthController],
  providers: [PrismaService, AuthService]
})
export class AuthModule {}
