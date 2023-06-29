import { Category } from "./category.model";
import { Promotion } from "./promotion.model";

export interface Place {
  id: string;
  webId: string;
  type: string;
  category: Category;
  gallery: string[];
  logoUrl: string;
  name: string;
  description: string;
  address: string;
  zone: string;
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
  googleMapsUrl: string;
  socialMedia: {
    name: string,
    url: string,
    type: 'facebook' | 'instagram',
  }[],
  labels: string[];
}
