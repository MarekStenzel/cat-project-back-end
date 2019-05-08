import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../types/cat';
import { Model } from 'mongoose';
import { CatDTO } from './cat.dto';
import { User } from '../types/user';

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async createCat(catDTO: CatDTO, user: User) {
    const catProfile = await this.catModel.create({
      ...catDTO,
      user,
    });
    await catProfile.save();
    return catProfile.populate('user');
  }

  async findAllCats() {
    return await this.catModel.find();
  }

}
