export interface Information {
  id: string;
  birthDate: Date;
  status: string;
  images: string[];
  coordinates: Location;
  sex: string;
  hobbies: string[];
  languages: string[];
}

export interface Location {
  latitude: number;
  longitude: number;
}
