import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { UserSeed } from './user.seed';
import { UsersModule } from '../src/users/users.module';
import { InformationSeed } from './information.seed';
import { SeedsService } from './seeds.service';
import { InformationsModule } from '../src/informations/informations.module';

@Module({
  imports: [CommandModule, UsersModule, InformationsModule],
  exports: [SeedsService],
  providers: [UserSeed, InformationSeed, SeedsService],
})
export class SeedsModule {}
