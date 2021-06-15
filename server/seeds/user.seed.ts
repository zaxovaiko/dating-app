import * as faker from 'faker';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../src/users/users.service';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

@Injectable()
export class UserSeed {
  constructor(private usersSerivce: UsersService) {}

  @Command({
    command: 'seed:users',
    describe: 'creates 10 fake users',
    autoExit: true,
  })
  async create() {
    for (let i = 0; i < 10; i++) {
      const user: CreateUserDto = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        completeSignup: false,
        password: 'password',
      };
      await this.usersSerivce.create(user);
    }
    console.log('Added 10 users');
  }
}
