import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema } from '../models/comment.schema';
import { CommentResolver } from '../resolvers/comment.resolver';
import { CatSchema } from '../models/cat.schema';
import { MemeSchema } from '../models/meme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Comment', schema: CommentSchema},
      {name: 'Cat', schema: CatSchema},
      {name: 'Meme', schema: MemeSchema},
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver],
})

export class CommentModule {}
