import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user';
import { Meme } from '../types/meme';
import { CreateMemeDTO, UpdateMemeDTO } from './meme.dto';

@Injectable()
export class MemeService {
  constructor(@InjectModel('Meme') private memeModel: Model<Meme>) {}

  async createMeme(memeDTO: CreateMemeDTO, user: User): Promise<Meme> {
    const memeProfile = await this.memeModel.create({
      ...memeDTO,
      user,
    });
    await memeProfile.save();
    return memeProfile.populate('user');
  }

  async deleteMeme(id: string, userId: string): Promise<Meme> {
    const memeProfile = await this.memeModel.findById(id);
    if (userId !== memeProfile.user.toString()) {
      throw new HttpException(
        `You didn't create this meme`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await memeProfile.remove();
    return memeProfile.populate('user');
  }

  async updateMeme(id: string, memeDTO: UpdateMemeDTO, userId: string): Promise<Meme> {
    const memeProfile = await this.memeModel.findById(id);
    if (userId !== memeProfile.user.toString()) {
      throw new HttpException(
        `You didn't create this meme`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await memeProfile.updateOne(memeDTO);
    return await this.memeModel.findById(id).populate('user');
  }

  async findAllMemes(): Promise<Meme[]> {
    return await this.memeModel.find().populate('user');
  }

  async findById(id: string): Promise<Meme> {
    return await this.memeModel.findById(id).populate('user');
  }
}
