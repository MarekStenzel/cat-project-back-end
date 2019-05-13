import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Foundation } from '../types/foundation';
import { CreateFoundationDTO, UpdateFoundationDTO } from './foundation.dto';

@Injectable()
export class FoundationService {
  constructor(@InjectModel('Foundation')
              private foundationModel: Model<Foundation>) {}

  async createFoundation(foundationDTO: CreateFoundationDTO): Promise<Foundation> {
    const foundation = await this.foundationModel.create(foundationDTO);
    await foundation.save();
    return foundation;
  }

  async updateFoundation(id: string, foundationDTO: UpdateFoundationDTO): Promise<Foundation> {
    const foundation = await this.foundationModel.findById(id);
    await foundation.updateOne(foundationDTO);
    return await this.foundationModel.findById(id);
  }

  async deleteFoundation(id: string): Promise<Foundation> {
    const foundation = await this.foundationModel.findById(id);
    await foundation.remove();
    return foundation;
  }

  async findAll(): Promise<Foundation[]> {
    return await this.foundationModel.find();
  }

  async findById(id: string): Promise<Foundation> {
    return await this.foundationModel.findById(id);
  }
}
