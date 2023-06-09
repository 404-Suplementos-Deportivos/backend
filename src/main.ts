import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS y permitir solo la URL del Frontend
  app.enableCors({
    origin: [configuration().frontendUrl, configuration().frontendUrlAdmin]
  });
  await app.listen(port, "0.0.0.0");
}
bootstrap();
