import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignupAuthDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
  'email',
  'password',
] as const) {}
