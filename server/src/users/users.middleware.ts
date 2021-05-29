import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import validator from 'validator';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from './users.service';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {
    //
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!validator.isMongoId(id)) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    next();
  }
}
