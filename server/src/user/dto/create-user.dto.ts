import { Information } from 'src/information/interfaces/information.interface';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  completeSignup: boolean;
  avatar: string;
  password: string;
  information: Information;
}
