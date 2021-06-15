import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class Coordinates {
  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;
}

export class CreateInformationDto {
  @ValidateIf((o) => !isNaN(new Date(o).getDate()))
  birthDate: string;

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
