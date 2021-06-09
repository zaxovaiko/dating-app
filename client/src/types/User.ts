import { Information } from "./Information";

export interface User {
  id: string;
  email: string;
  completeSignup: boolean;
  firstName: string;
  lastName: string;
  password: string;
  avatar: string;
  roles: string[];
  information: Information;
}
