import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordUserDto extends PickType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  newPassword: string;
}
