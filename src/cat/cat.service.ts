import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../types/cat';
import { Model } from 'mongoose';
import { CatDTO } from './cat.dto';

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async createCat(catDTO: CatDTO) {
    const catProfile = new this.catModel(catDTO);
    return await catProfile.save();
  }

  async findAllCats() {
    return await this.catModel.find();
  }

}
