import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { AuthGuard } from '@nestjs/passport';
import { MemeService } from './meme.service';
import { CreateMemeDTO, UpdateMemeDTO } from './meme.dto';
import { Meme } from 'src/types/meme';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';

@Controller('memes')
export class MemeController {
  constructor(private memeService: MemeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() memeDTO: CreateMemeDTO,
               @User() user: UserDocument): Promise<Meme> {
    return await this.memeService.createMeme(memeDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', new ValidateObjectId()) id: string,
               @User() user: UserDocument): Promise<Meme> {
    const { id: userId } = user;
    return await this.memeService.deleteMeme(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id', new ValidateObjectId()) id: string,
               @Body() meme: UpdateMemeDTO,
               @User() user: UserDocument): Promise<Meme> {
    const { id: userId } = user;
    return await this.memeService.updateMeme(id, meme, userId);
  }

  @Get()
  async findAll(): Promise<Meme[]> {
    return this.memeService.findAllMemes();
  }

  @Get(':id')
  async read(@Param('id', new ValidateObjectId()) id: string): Promise<Meme> {
    const meme = await this.memeService.findById(id);
    if (!meme) {
      throw new HttpException(
        'Meme not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return meme;
  }
}
