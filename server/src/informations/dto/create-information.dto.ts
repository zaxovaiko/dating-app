import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class Coordinates {
  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;
}

export class CreateInformationDto {
  @IsDate()
  birthDate: Date;

  @IsIn(['male', 'female', 'other'])
  sex: string;

  @MaxLength(300)
  status: string;

  @MaxLength(12, {
    each: true,
  })
  hobbies: Set<string>;

  @MaxLength(12, {
    each: true,
  })
  languages: Set<string>;

  @IsString({
    each: true,
  })
  images: string[];

  @ValidateNested()
  coordinates: Coordinates;
}

export class CreateOptionalInformationDto extends PartialType(
  CreateInformationDto,
) {}
