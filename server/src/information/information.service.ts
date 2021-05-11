import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { Information, InformationDocument } from './schemas/information.schema';

@Injectable()
export class InformationService {
  constructor(
    @InjectModel(Information.name)
    private informationModel: Model<InformationDocument>,
    private userService: UserService,
  ) {}

  async create(userId: string, createInformationDto: CreateInformationDto) {
    const user = await this.userService.findOne(userId);
    const info = await this.informationModel.create(createInformationDto);
    user.information = info;
    user.completeSignup = true;
    await user.save();
    return info;
  }

  async findOne(id: string) {
    const info = await this.informationModel.findById(id);
    if (!info) {
      throw new HttpException(
        'Information does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return info;
  }

  async update(id: string, updateInformationDto: UpdateInformationDto) {
    const info = await this.findOne(id);
    for (const [key, value] of Object.entries(updateInformationDto)) {
      info[key] = value;
    }
    return await info.save();
  }

  async remove(id: string) {
    const info = await this.findOne(id);
    return await info.deleteOne();
  }
}
