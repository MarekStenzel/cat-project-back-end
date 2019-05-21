import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CatService } from './cat/cat.service';
import { CatModule } from './cat/cat.module';
import { FoundationModule } from './foundation/foundation.module';
import { CommentModule } from './comment/comment.module';
import { MemeModule } from './meme/meme.module';
import { MulterModule } from '@nestjs/platform-express';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';
import { PhotoModule } from './photo/photo.module';
import 'dotenv/config';
import { MemeService } from './meme/meme.service';

const URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forRoot(URI,
    { useNewUrlParser: true}),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({req}) => ({req}),
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    SharedModule,
    AuthModule,
    CatModule,
    FoundationModule,
    CommentModule,
    MemeModule,
    PhotoModule,
  ],
  controllers: [AppController, PhotoController],
  providers: [AppService, CatService, PhotoService, MemeService],
})
export class AppModule {}
