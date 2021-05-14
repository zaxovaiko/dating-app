import { IsEmail, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @Length(2, 20)
  firstName: string;

  @Length(2, 20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  completeSignup: boolean;

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  password: string;
}
