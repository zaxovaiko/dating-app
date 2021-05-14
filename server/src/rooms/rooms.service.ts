import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './schemas/rooms.schema';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private configServer: ConfigService,
    private userService: UsersService,
  ) {}

  async create(userId: string, createRoomDto: CreateRoomDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    createRoomDto.users = [user.id];
    return await this.roomModel.create(createRoomDto);
  }

  findAll() {
    return this.roomModel.find();
  }

  findOne(id: string) {
    return this.roomModel.findById(id);
  }

  remove(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }
}
