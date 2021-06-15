export interface Information {
  birthDate: Date;
  sex: string;
  status: string;
  languages: string[];
  hobbies: string[];
  images: string[];
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
