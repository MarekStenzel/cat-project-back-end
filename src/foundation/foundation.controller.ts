import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FoundationService } from './foundation.service';
import { CreateFoundationDTO, UpdateFoundationDTO } from './foundation.dto';

@Controller('foundations')
export class FoundationController {
  constructor(private foundationService: FoundationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() foundationDTO: CreateFoundationDTO) {
    return await this.foundationService.createFoundation(foundationDTO);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string,
               @Body() foundationDTO: UpdateFoundationDTO) {
    const foundation = await this.foundationService.findById(id);
    if (!foundation) {
      throw new HttpException(
        'Foundation not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.foundationService.updateFoundation(id, foundationDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    const foundation = await this.foundationService.findById(id);
    if (!foundation) {
      throw new HttpException(
        'Foundation not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.foundationService.deleteFoundation(id);
  }

  @Get()
  async showAll() {
    return await this.foundationService.findAll();
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    const foundation = await this.foundationService.findById(id);
    if (!foundation) {
      throw new HttpException(
        'Foundation not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundation;
  }
}
