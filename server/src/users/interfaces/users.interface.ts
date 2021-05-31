import { Information } from 'src/informations/interfaces/informations.interface';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: string[];
  password: string;
  liked: User[];
  disliked: User[];
  saved: User[];
  completeSignup: boolean;
  information: Information;
}
