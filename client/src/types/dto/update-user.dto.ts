export type UpdateUserDto = {
  birthDate: Date;
  sex: string;
  avatar: string;
  status: string;
  hobbies: string[];
  languages: string[];
  images: string[];
  coordinates: Coordinates;
};

export type Coordinates = {
  longitude: number;
  latitude: number;
};
