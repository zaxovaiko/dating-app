import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { UpdateNameUserDto } from './dto/update-name-user.dto';
import { UpdateAvatarUserDto } from './dto/update-avatar-user.dto';
import { InformationsService } from 'src/informations/informations.service';
import { UpdateInformationDto } from 'src/informations/dto/update-information.dto';
import { RelationUserDto } from './dto/relation-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private informationsService: InformationsService,
    private configServer: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      parseInt(this.configServer.get<string>('BCRYPT_SALT_ROUNDS', '12')),
    );
    const user = await this.usersModel.create(createUserDto);
    const information = await this.informationsService.create({});
    user.information = information;
    return await user.save();
  }

  findMany(projection = '') {
    return this.usersModel.find({}, projection);
  }

  findOneByEmail(email: string, projection = '') {
    return this.usersModel.findOne({ email }, projection);
  }

  async updateName(id: string, updateNameUserDto: UpdateNameUserDto) {
    const user = await this.findOneById(id);
    for (const [key, value] of Object.entries(updateNameUserDto)) {
      user[key] = value;
    }
    await user.save();
    user.password = undefined;
    return user;
  }

  async updateInformation(
    id: string,
    updateInformationDto: UpdateInformationDto,
  ) {
    const user = await this.findOneById(id, '-password');
    const information = await this.informationsService.update(
      String(user.information),
      updateInformationDto,
    );
    if (!information) {
      throw new HttpException(
        'Information was not updated',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    user.completeSignup = true;
    await user.save();
    return await user.populate('information').execPopulate();
  }

  async updateAvatar(id: string, updateAvatarUserDto: UpdateAvatarUserDto) {
    const user = await this.findOneById(id, '-password');
    user.avatar = updateAvatarUserDto.avatar;
    return await user.save();
  }

  findOneById(id: string, projection = '') {
    return this.usersModel.findById(id, projection);
  }

  async remove(id: string) {
    const user = await this.usersModel.findByIdAndDelete(id, {
      projection: '-password',
    });
    await this.informationsService.remove(String(user.information));
    user.information = undefined;
    return user;
  }

  async likeUser(relationUserDto: RelationUserDto) {
    const { targetId, likerId } = relationUserDto;
    const liker = await this.findOneById(likerId);
    const target = await this.findOneById(targetId);
    if (!liker || !target) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    if (liker.liked.includes(target) || liker.disliked.includes(target)) {
      throw new HttpException(
        'You have already liked or disliked this user',
        HttpStatus.CONFLICT,
      );
    }
    liker.liked.push(target);
    return await liker.save();
  }

  async dislikeUser(relationUserDto: RelationUserDto) {
    const { targetId, likerId } = relationUserDto;
    const liker = await this.findOneById(likerId);
    const target = await this.findOneById(targetId);
    if (!liker || !target) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    if (liker.liked.includes(target) || liker.disliked.includes(target)) {
      throw new HttpException(
        'You have already liked or disliked this user',
        HttpStatus.CONFLICT,
      );
    }
    // check if is already liked
    // check if is already disliked
  }
}
