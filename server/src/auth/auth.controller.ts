import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator.helper';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth(): null {
    return;
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() request): Promise<any> {
    return this.authService.googleAuth(request.user);
  }

  @Get('refresh-token')
  refreshToken(@Req() request): Promise<any> {
    return this.authService.login(request.user);
  }
}
