import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS y permitir solo la URL del Frontend
  app.enableCors({
    origin: configuration().frontendUrl
  });
  await app.listen(4000);
}
bootstrap();
