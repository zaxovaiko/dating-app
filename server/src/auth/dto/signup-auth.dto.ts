import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class SignupAuthDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
  'email',
  'password',
] as const) {}
