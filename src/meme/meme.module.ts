import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';
import { MemeSchema } from '../models/meme.schema';
import { MemeResolver } from '../resolvers/meme.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Meme', schema: MemeSchema}]),
  ],
  controllers: [MemeController],
  providers: [MemeService, MemeResolver],
})
export class MemeModule {}
