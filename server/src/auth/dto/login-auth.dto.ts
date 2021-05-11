import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class LoginAuthDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
