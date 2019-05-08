import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDTO } from './cat.dto';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  async create(@Body() catDTO: CatDTO) {
    return await this.catService.createCat(catDTO);
  }

  @Get()
  async findAll() {
    return this.catService.findAllCats();
  }

}
