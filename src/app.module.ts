import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CatService } from './cat/cat.service';
import { CatModule } from './cat/cat.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI,
    { useNewUrlParser: true}),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    SharedModule,
    AuthModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatService],
})
export class AppModule {}
