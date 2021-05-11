import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class Location {
  @IsOptional()
  country: string;

  @IsOptional()
  city: string;

  @IsOptional()
  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsLatitude()
  latitude: number;
}

export class CreateInformationDto {
  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  status: string;

  @IsOptional()
  hobbies: Set<string>;

  @IsOptional()
  languages: Set<string>;

  @IsOptional()
  images: Set<string>;

  @ValidateNested()
  location: Location;
}
