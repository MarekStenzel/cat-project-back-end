import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../types/cat';
import { Model } from 'mongoose';
import { CreateCatDTO, UpdateCatDTO } from './cat.dto';
import { User } from '../types/user';

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async createCat(catDTO: CreateCatDTO, user: User): Promise<Cat> {
    const catProfile = await this.catModel.create({
      ...catDTO,
      user,
    });
    await catProfile.save();
    return catProfile.populate('user');
  }

  async findAllCats(): Promise<Cat[]> {
    return await this.catModel.find();
  }

  async deleteCat(id: string, userId: string): Promise<Cat> {
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

  async updateCat(id: string, catDTO: UpdateCatDTO, userId: string): Promise<Cat> {
    const catProfile = await this.catModel.findById(id);
    if (userId !== catProfile.user.toString()) {
      throw new HttpException(
        `You don't have this cat`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await catProfile.updateOne(catDTO);
    return await this.catModel.findById(id).populate('user');
  }

}
