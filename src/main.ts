import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

if (process.env.NODE_ENV === 'test') {
  Logger.log('------------TESTING IN PROGRESS----------------');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
