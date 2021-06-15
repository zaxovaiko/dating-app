import { PartialType } from '@nestjs/mapped-types';
import {
  IsIn,
  IsLatitude,
  IsLongitude,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class Coordinates {
  @IsLongitude()
  longitude: number | string;

  @IsLatitude()
  latitude: number | string;
}

export class CreateInformationDto {
  @ValidateIf((o) => !isNaN(new Date(o).getDate()))
  birthDate: Date;

  @IsIn(['male', 'female', 'other'])
  sex: string;

  @MaxLength(300)
  status: string;

  @MaxLength(12, {
    each: true,
  })
  hobbies: string[];

  @MaxLength(12, {
    each: true,
  })
  languages: string[];

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
