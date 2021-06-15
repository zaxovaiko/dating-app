import { Command } from 'nestjs-command';
import { datatype, lorem, address } from 'faker';
import { UpdateInformationDto } from '../src/informations/dto/update-information.dto';
import { UserDocument } from '../src/users/schemas/users.schema';
import { UsersService } from '../src/users/users.service';
import { Injectable } from '@nestjs/common';
import { InformationsService } from '../src/informations/informations.service';

@Injectable()
export class InformationSeed {
  constructor(
    private usersService: UsersService,
    private informationService: InformationsService,
  ) {}

  @Command({
    command: 'seed:informations',
    describe: 'creates 10 fake informations',
    autoExit: true,
  })
  async create() {
    for (let i = 0; i < 10; i++) {
      const information: UpdateInformationDto = {
        birthDate: new Date(
          new Date().getFullYear() - 18 - datatype.number(40),
          datatype.number(12),
          datatype.number(28),
        ),
        status: lorem.sentences(3),
        sex: ['male', 'female', 'other'][datatype.number(2)],
        coordinates: {
          longitude: address.longitude(),
          latitude: address.latitude(),
        },
        languages: Array.from({ length: datatype.number(6) }, () =>
          lorem.word(),
        ),
        hobbies: Array.from({ length: datatype.number(6) }, () => lorem.word()),
      };

      const user: UserDocument = (await this.usersService.getRandom())[0];
      if (!user) {
        return;
      }
      await this.usersService.updateInformation(user._id, information);
    }
    console.log('Added 10 informations');
  }
}
