import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoSchema } from '../models/photo.schema';
import { CatSchema } from '../models/cat.schema';
import { MemeSchema } from '../models/meme.schema';
import { CatService } from '../cat/cat.service';
import { MemeService } from '../meme/meme.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Photo', schema: PhotoSchema},
      {name: 'Cat', schema: CatSchema},
      {name: 'Meme', schema: MemeSchema},
    ]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService, CatService, MemeService],
})
export class PhotoModule {}
