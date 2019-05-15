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
import 'dotenv/config';

const URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forRoot(URI,
    { useNewUrlParser: true}),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({req}) => ({req}),
    }),
    SharedModule,
    AuthModule,
    CatModule,
    FoundationModule,
    CommentModule,
    MemeModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatService],
})
export class AppModule {}
