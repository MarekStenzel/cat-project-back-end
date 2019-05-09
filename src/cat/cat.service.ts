import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../types/cat';
import { Model } from 'mongoose';
import { CreateCatDTO } from './cat.dto';
import { User } from '../types/user';

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async createCat(catDTO: CreateCatDTO, user: User) {
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

  async deleteCat(id: string, userId: string) {
    const catProfile = await this.catModel.findById(id);
    if (userId !== catProfile.user.toString()) {
      throw new HttpException(
        `You don't have this cat`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await catProfile.remove();
    return catProfile.populate('user');
  }

}
