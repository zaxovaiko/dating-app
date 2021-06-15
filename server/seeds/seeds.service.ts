import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InformationsService } from '../src/informations/informations.service';
import { UsersService } from '../src/users/users.service';
import { InformationSeed } from './information.seed';
import { UserSeed } from './user.seed';

@Injectable()
export class SeedsService {
  constructor(
    private usersService: UsersService,
    private informationService: InformationsService,
    private userSeed: UserSeed,
    private informationSeed: InformationSeed,
  ) {}

  @Command({
    command: 'seed:run',
    describe: 'runs all seeds',
    autoExit: true,
  })
  async run() {
    await this.userSeed.create();
    await this.informationSeed.create();
  }

  @Command({
    command: 'seed:cleanrun',
    describe: 'cleans database and runs all seeds',
    autoExit: true,
  })
  async clearAndRun() {
    await this.usersService.deleteMany();
    await this.informationService.deleteMany();
    console.log('Collections were cleared');
    await this.run();
  }
}
