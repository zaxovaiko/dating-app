import { Information } from 'src/information/interfaces/informations.interface';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: string[];
  password: string;
  completeSignup: boolean;
  information: Information;
}
