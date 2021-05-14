export interface Information {
  birthDate: Date;
  sex: string;
  status: string;
  languages: string[];
  hobbies: string[];
  images: string[];
  location: Location;
}

export interface Location {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}
