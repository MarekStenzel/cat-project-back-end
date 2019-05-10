import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoundationService } from './foundation.service';
import { FoundationSchema } from '../models/foundation.schema';
import { FoundationController } from './foundation.controller';
import { FoundationResolver } from '../resolvers/foundation.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Foundation', schema: FoundationSchema}]),
  ],
  controllers: [FoundationController],
  providers: [FoundationService, FoundationResolver],
})
export class FoundationModule {}
