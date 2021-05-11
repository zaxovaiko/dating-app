import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNameUserDto } from './dto/update-name-user.dto';
import { UpdateAvatarUserDto } from './dto/update-avatar-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findMany() {
    return this.userService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('avatar/:id')
  updateAvatar(
    @Param('id') id: string,
    updateAvatarUserDto: UpdateAvatarUserDto,
  ) {
    return this.userService.updateAvatar(id, updateAvatarUserDto);
  }

  @Patch(':id')
  updateName(@Param('id') id: string, updateNameUserDto: UpdateNameUserDto) {
    return this.userService.updateName(id, updateNameUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
