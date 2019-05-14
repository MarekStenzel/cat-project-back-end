import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema } from '../models/comment.schema';
import { CommentResolver } from '../resolvers/comment.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Comment', schema: CommentSchema}]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
