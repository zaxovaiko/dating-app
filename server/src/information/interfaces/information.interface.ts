export interface Information {
  age: number;
  status: string;
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
