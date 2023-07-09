import { Category } from "./category.model";
import { Promotion } from "./promotion.model";

export interface Place {
  id?: string;
  webId: string;
  // type: string;
  // category: Category;
  idCategory: string;
  gallery: string[];
  logoUrl: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  address: string;
  zones: string[];
  budget?: string;
  schedule: string;
  phone: string,
  additionalLinks?: {
    name: string,
    url: string,
  }[];
  mainAmenities: {
    name: string;
    icon: string;
  }[];
  otherAmenities?: {
    name: string;
    icon: string;
  }[];
  googleMapsUrl: string;
  socialMedia: {
    name: string,
    url: string,
    type: 'facebook' | 'instagram',
  }[],
  labels: string[];
}
