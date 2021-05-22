import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { VerifiedCallback } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('HOST') + 'auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    if (!profile.id) {
      done(null, null);
    }

    try {
      const user = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        password: profile.id,
      };

      const userFromDB = await this.usersService.findOneByEmail(user.email);
      if (!userFromDB) {
        done(null, await this.authService.signup(user));
      }

      done(null, await this.authService.login(user));
    } catch (err) {
      done(err, null);
    }
  }
}
