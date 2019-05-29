import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
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
    const catProfile = await this.catModel.findById(id);
    if (user._id.toString() !== catProfile.user.toString()) {
      throw new HttpException(
        `It's not your cat`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    let photoProfile;
    photoProfile = await this.photoModel.create({
      catId: id,
      ...photoDTO,
      user,
    });
    const newPhotoTable = catProfile.photos;
    newPhotoTable.push(photoProfile);
    await catProfile.updateOne({photos: newPhotoTable});
    await catProfile.save();
    await photoProfile.save();
    return photoProfile.populate('user');
  }

  async addMemePhoto(id: string, photoDTO: CreatePhotoDTO, user: User): Promise<Photo> {
    const memeProfile = await this.memeModel.findById(id);
    if (user._id.toString() !== memeProfile.user.toString()) {
      throw new HttpException(
        `It's not your meme`,
        HttpStatus.UNAUTHORIZED,
      );
    }
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
    return await this.photoModel.find({catId: id}).populate('user');
  }

  async findMemePhotos(id: string): Promise<Photo[]> {
    return await this.photoModel.find({memeId: id}).populate('user');
  }

  async findPhotoByImgPath(imgpath: string): Promise<Photo[]> {
    return await this.photoModel.find({path: imgpath});
  }

  async deletePhotoById(id: string, imgpath: string, userId: string): Promise<Photo> {
    const photoProfile = await this.photoModel.findById(id);
    if (userId !== photoProfile.user.toString()) {
      throw new HttpException(
        `It's not your photo`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    fs.unlinkSync(imgpath);
    await photoProfile.remove();
    return photoProfile;
  }
}
