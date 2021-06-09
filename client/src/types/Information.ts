export interface Information {
  id: string;
  birthDate: Date;
  status: string;
  images: string[];
  location: Location;
  sex: string;
  hobbies: string[];
  languages: string[];
}

export interface Location {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}
