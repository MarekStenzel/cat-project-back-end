import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { HttpExceptionFilter } from './http-exception.filter';
import { UserService } from './user.service';
import { LoggingInterceptor } from './logging.interceptor';
import { UserResolver } from '../resolvers/user.resolver';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User',
      schema: UserSchema}]),
  ],
  providers: [UserService, AuthService, UserResolver,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }],
  exports: [UserService],
})
export class SharedModule {}
