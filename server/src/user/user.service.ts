import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configServer: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      parseInt(this.configServer.get<string>('BCRYPT_SALT_ROUNDS', '12')),
    );
    return await this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
