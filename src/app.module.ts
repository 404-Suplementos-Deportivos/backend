import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersModule } from './users/modules/users.module';
import { AuthModule } from './auth/modules/auth.module';
import { ProductsModule } from './products/modules/products.module';
import { ComprasModule } from './compras/modules/compras.module';
import { VentasModule } from './ventas/modules/ventas.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env',
    isGlobal: true,
    load: [configuration]
  }), UsersModule, AuthModule, ProductsModule, ProductsModule, ComprasModule, VentasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
