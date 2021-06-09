import * as gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  googleAuth(access_token: any): any {
    if (access_token) {
      return access_token;
    }
    throw new HttpException('Something went wrong', HttpStatus.FORBIDDEN);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...rest } = user;
      return rest;
    }
    throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
  }

  async signup(signupAuthDto: SignupAuthDto): Promise<any> {
    let user = await this.userService.findOneByEmail(signupAuthDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const avatar = gravatar.url(signupAuthDto.email, {
      s: '550',
      r: 'x',
      d: 'mp',
    });
    user = await this.userService.create({
      ...signupAuthDto,
      avatar,
      completeSignup: false,
    });
    return await this.login(user);
  }

  async login(loginAuthDto: LoginAuthDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
    const { firstName, lastName, email, id, roles, completeSignup } = user;
    return {
      access_token: this.jwtService.sign({
        firstName,
        lastName,
        email,
        id,
        roles,
        completeSignup,
      }),
    };
  }
}
