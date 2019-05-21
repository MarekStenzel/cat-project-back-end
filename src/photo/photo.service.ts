import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../types/cat';
import { Meme } from '../types/meme';
import { User } from '../types/user';
import { Photo } from '../types/photo';
import { CreatePhotoDTO } from './photo.dto';

@Injectable()
export class PhotoService {
  constructor(@InjectModel('Photo')
              private photoModel: Model<Photo>,
              @InjectModel('Cat')
              private catModel: Model<Cat>,
              @InjectModel('Meme')
              private memeModel: Model<Meme>) {}

  async addCatPhoto(id: string, photoDTO: CreatePhotoDTO, user: User): Promise<Photo> {
    let photoProfile;
    photoProfile = await this.photoModel.create({
      catId: id,
      ...photoDTO,
      user,
    });
    await photoProfile.save();
    return photoProfile.populate('user');
  }

  async addMemePhoto(id: string, photoDTO: CreatePhotoDTO, user: User): Promise<Photo> {
    let photoProfile;
    photoProfile = await this.photoModel.create({
      memeId: id,
      ...photoDTO,
      user,
    });
    await photoProfile.save();
    return photoProfile.populate('user');
  }

  async findAllPhotos(): Promise<Photo[]> {
    return await this.photoModel.find();
  }

  async findCatPhotos(id: string): Promise<Photo[]> {
    return await this.photoModel.find({catId: id});
  }

  async findMemePhotos(id: string): Promise<Photo[]> {
    return await this.photoModel.find({memeId: id});
  }
}
