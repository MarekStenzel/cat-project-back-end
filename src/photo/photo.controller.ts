import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFiles, UseInterceptors, Delete, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { CatService } from '../cat/cat.service';
import { MemeService } from '../meme/meme.service';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';
import { User } from '../utilities/user.decorator';
import { User as UserDocument} from '../types/user';
import { Photo } from '../types/photo';
import { AuthGuard } from '@nestjs/passport';

@Controller('photos')
export class PhotoController {
  constructor(private photoService: PhotoService,
              private catService: CatService,
              private memeService: MemeService) {}

  @Post('create/cat/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('image'))
  async uploadCatPhoto(@UploadedFiles() file,
                       @Param('id', new ValidateObjectId()) id: string,
                       @User() user: UserDocument) {
    if (!file) {
      throw new HttpException(
        'File not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const catProfile = await this.catService.findById(id);
    if (!catProfile) {
      throw new HttpException(
        'Cat not found',
        HttpStatus.NOT_FOUND,
      );
    }
    let fileData;
    fileData = {
      field: file[0].fieldname,
      name: file[0].originalname,
      encoding: file[0].encoding,
      mime: file[0].mimetype,
      destination: file[0].destination,
      filename: file[0].filename,
      path: file[0].path,
      size: file[0].size,
    };
    return await this.photoService.addCatPhoto(id, fileData, user);
  }

  @Post('create/meme/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('image'))
  async uploadMemePhoto(@UploadedFiles() file,
                        @Param('id', new ValidateObjectId()) id: string,
                        @User() user: UserDocument) {
    if (!file) {
      throw new HttpException(
        'File not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const memeProfile = await this.memeService.findById(id);
    if (!memeProfile) {
      throw new HttpException(
        'Meme not found',
        HttpStatus.NOT_FOUND,
      );
    }
    let fileData;
    fileData = {
      field: file[0].fieldname,
      name: file[0].originalname,
      encoding: file[0].encoding,
      mime: file[0].mimetype,
      destination: file[0].destination,
      filename: file[0].filename,
      path: file[0].path,
      size: file[0].size,
    };
    return await this.photoService.addMemePhoto(id, fileData, user);
  }

  @Get()
  async findAllPhotos(): Promise<Photo[]> {
    return await this.photoService.findAllPhotos();
  }

  @Get('cat/:id')
  async findCatPhotos(@Param('id', new ValidateObjectId()) id: string): Promise<Photo[]> {
    return await this.photoService.findCatPhotos(id);
  }

  @Get('meme/:id')
  async findMemePhotos(@Param('id', new ValidateObjectId()) id: string): Promise<Photo[]> {
    return await this.photoService.findMemePhotos(id);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {root: 'uploads'});
  }

  @Delete('uploads/:filename')
  @UseGuards(AuthGuard('jwt'))
  async deletePhoto(@Param('filename') filename: string, @User() user: UserDocument) {
    const imgpath = `uploads/${filename}`;
    const photoProfile = await this.photoService.findPhotoByImgPath(imgpath);
    if (!photoProfile[0]) {
      throw new HttpException(
        'Photo not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const { id: userId } = user;
    return await this.photoService.deletePhotoById(photoProfile[0]._id, imgpath, userId);
  }
}
