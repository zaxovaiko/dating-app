import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateAvatarUserDto extends PickType(CreateUserDto, [
  'avatar',
] as const) {}
