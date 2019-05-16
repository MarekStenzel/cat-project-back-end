import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CatService } from './cat.service';
import { CreateCatDTO, UpdateCatDTO } from './cat.dto';
import { User } from '../utilities/user.decorator';
import { User as UserDocument} from '../types/user';
import { Cat } from '../types/cat';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() catDTO: CreateCatDTO,
               @User() user: UserDocument): Promise<Cat> {
    return await this.catService.createCat(catDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', new ValidateObjectId()) id: string,
               @User() user: UserDocument): Promise<Cat> {
    const { id: userId } = user;
    return await this.catService.deleteCat(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id', new ValidateObjectId()) id: string,
               @Body() cat: UpdateCatDTO,
               @User() user: UserDocument): Promise<Cat> {
    const { id: userId } = user;
    return await this.catService.updateCat(id, cat, userId);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAllCats();
  }

  @Get(':id')
  async read(@Param('id', new ValidateObjectId()) id: string): Promise<Cat> {
    const cat = await this.catService.findById(id);
    if (!cat) {
      throw new HttpException(
        'Foundation not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return cat;
  }

}
