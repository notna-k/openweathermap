import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptorGlobal } from './shared/interceptors/logging.interceptor.global';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

async function start() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(errors, 'Validation Error'),
    }),
  );

  app.setGlobalPrefix('/v1');
  app.useGlobalInterceptors(new LoggingInterceptorGlobal());

  await app.listen(PORT, () => {
    console.log(`${new Date().toISOString()}: listening on port = ${PORT}`);
  });
}

start();
