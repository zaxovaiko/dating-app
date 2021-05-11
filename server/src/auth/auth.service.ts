import * as gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signup(signupAuthDto: SignupAuthDto) {
    const avatar = gravatar.url(signupAuthDto.email, {
      s: '550',
      r: 'x',
      d: 'mp',
    });
    const user = await this.userService.create({
      ...signupAuthDto,
      avatar,
      completeSignup: false,
    });
    return this.login(user);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
    const { firstName, lastName, email, id, roles } = user;
    return {
      access_token: this.jwtService.sign({
        firstName,
        lastName,
        email,
        id,
        roles,
      }),
    };
  }
}
