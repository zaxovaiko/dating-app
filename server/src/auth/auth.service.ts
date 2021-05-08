import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  signup(signupAuthDto: SignupAuthDto) {
    return 'This action adds a new auth';
  }

  login(loginAuthDto: LoginAuthDto) {
    return `This action returns a auth`;
  }
}
