import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  Logger.log('------------TESTING IN PROGRESS----------------');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
