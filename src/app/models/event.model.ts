import { Category } from "./category.model";

export interface Event {
  id: string;
  bannerImgUrl: string;
  category: Category;
  name: string;
  description: string;
  address: string;
  budget: number;
  eventDate: Date;
  additionalLinks: {
    name: string;
    url: string;
  }[];
  mainAmenities: {
    name: string;
    icon: string;
  }[];
  otherAmenities: {
    name: string;
    icon: string;
  }[];
  location: {
    latitude: number,
    longitude: number,
  };
  facebookUrl: string;
  instagramUrl: string;
  labels: string[];
}
