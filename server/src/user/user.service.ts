import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { UpdateNameUserDto } from './dto/update-name-user.dto';
import { UpdateAvatarUserDto } from './dto/update-avatar-user.dto';

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

  findMany() {
    return this.userModel.find({}, '-password');
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateName(id: string, updateNameUserDto: UpdateNameUserDto) {
    const user = await this.findOne(id);
    for (const [key, value] of Object.entries(updateNameUserDto)) {
      user[key] = value;
    }
    return await user.save();
  }

  async updateAvatar(id: string, updateAvatarUserDto: UpdateAvatarUserDto) {
    const user = await this.findOne(id);
    user.avatar = updateAvatarUserDto.avatar;
    return await user.save();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await user.deleteOne();
  }
}
