import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CatService } from './cat.service';
import { CatDTO } from './cat.dto';
import { User } from '../utilities/user.decorator';
import { User as UserDocument} from '../types/user';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() catDTO: CatDTO, @User() user: UserDocument) {
    return await this.catService.createCat(catDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @User() user: UserDocument) {
    const { id: userId } = user;
    return await this.catService.deleteCat(id, userId);
  }

  @Get()
  async findAll() {
    return this.catService.findAllCats();
  }

}
