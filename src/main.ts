import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NextFunction, Response } from 'express';

const ENV = process.env.NODE_ENV;
const front_URL = process.env.FRONTEND_URL;

const origin = ENV === 'PROD' ? front_URL : 'https://localhost:5174';
console.log(origin);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  });

  app.enableCors({
    origin: 'https://genie-construction-eben-ezer.vercel.app', // Ton frontend spécifique
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization, Accept', // En-têtes autorisés
    credentials: true, // Permet l'envoi et la réception des cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
