import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateNameUserDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
] as const) {}
