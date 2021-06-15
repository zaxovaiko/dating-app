import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, UpdateQuery } from 'mongoose';
import { CreateOptionalInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import {
  Information,
  InformationDocument,
} from './schemas/informations.schema';

@Injectable()
export class InformationsService {
  constructor(
    @InjectModel(Information.name)
    private informationsModel: Model<InformationDocument>,
  ) {}

  create(createInformationDto: CreateOptionalInformationDto) {
    return this.informationsModel.create(createInformationDto);
  }

  findOneById(id: string) {
    return this.informationsModel.findById(id);
  }

  async update(id: string, updateInformationDto: UpdateInformationDto) {
    await this.informationsModel.findByIdAndUpdate(
      id,
      updateInformationDto as any,
    );
    return true;
  }

  async remove(id: string) {
    return this.informationsModel.findByIdAndDelete(id);
  }
}
