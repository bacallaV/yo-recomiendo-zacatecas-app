import { Category } from "./category.model";
import { Promotion } from "./promotion.model";

export interface Place {
  id: string;
  type: string;
  category: Category;
  gallery: string[];
  logoUrl: string;
  name: string;
  description: string;
  address: string;
  budget: string;
  schedule: string;
  additionalLinks: {
    name: string,
    url: string,
  }[];
  mainAmenities: {
    name: string;
    icon: string;
  }[];
  otherAmenities: {
    name: string;
    icon: string;
  }[];
  promotions: Promotion[];
  location: {
    latitude: number,
    longitude: number,
  };
  facebookUrl: string;
  instagramUrl: string;
  labels: string[];
}
