import { Information } from "src/information/interfaces/information.interface";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password: string;
  completeSignup: boolean;
  information: Information;
}
