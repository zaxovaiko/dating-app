import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from 'src/user/interfaces/users.interface';

export class CreateRoomDto {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @MaxLength(20)
  topic: string;

  users: string[];

  @IsNotEmpty()
  tags: string[];
}
