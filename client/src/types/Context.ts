import { User } from "./User";

export type AuthState = {
  token: string | null;
  user: User | null;
};

export type UserCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IAuthContext {
  auth: AuthState;
  setAuth?: any;
  logoutAndSetAuth?: any;
  refreshAndSetAuth?: any;
  loginAndSetAuth?: any;
  signupAndSetAuth?: any;
}
