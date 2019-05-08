import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CatService } from './cat.service';
import { CatDTO } from './cat.dto';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() catDTO: CatDTO) {
    return await this.catService.createCat(catDTO);
  }

  @Get()
  async findAll() {
    return this.catService.findAllCats();
  }

}
