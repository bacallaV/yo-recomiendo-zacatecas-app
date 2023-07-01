import { Category } from "./category.model";

export interface EventModel {
  id: string;
  webId: string;
  bannerImgUrl: string;
  category: Category;
  name: string;
  description: string;
  address: string;
  budget: string;
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
  googleMapsUrl: string;
  socialMedia: {
    name: string,
    url: string,
    type: 'facebook' | 'instagram',
  }[],
  labels: string[];
}
