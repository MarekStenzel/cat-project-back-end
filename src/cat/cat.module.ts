import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatSchema } from '../models/cat.schema';
import { CatResolver } from '../resolvers/cat.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Cat', schema: CatSchema}]),
  ],
  controllers: [CatController],
  providers: [CatService, CatResolver],
})
export class CatModule {}
