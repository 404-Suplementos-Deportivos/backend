import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import configuration from 'src/config/configuration';
import { VentasService } from '../services/ventas.service';
import { VentasController } from '../controllers/ventas.controller';

@Module({
  imports: [
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
  controllers: [VentasController],
  providers: [PrismaService, JwtStrategy, VentasService]
})
export class VentasModule {}
