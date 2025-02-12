import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { origin } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: origin,
    credentials: true,
    methods: 'GET, PUT, POST, DELETE, OPTIONS',
    allowedHeaders: 'X-Requested-With, Content-Type, Accept, Observe',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
