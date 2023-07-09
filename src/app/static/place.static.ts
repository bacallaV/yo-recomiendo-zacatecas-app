import { Place } from '../models/place.model';

import { amenities } from './amenities.static';

export const examplePlace: Place = {
  id: '1',
  webId: 'los-reyes',
  // type: 'Restaurante',
  idCategory: "",
  gallery: [
    "./assets/images/concierto.jpg",
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
    "https://swiperjs.com/demos/images/nature-5.jpg",
  ],
  logoUrl: "https://static.wixstatic.com/media/eb7299_75efe7477e424f7d9ffeeaccecb128e1~mv2.png/v1/fill/w_560,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/eb7299_75efe7477e424f7d9ffeeaccecb128e1~mv2.png",
  name: "Los Reyes",
  shortDescription: "Una cantina con el mejor ambiente para venir acompañado, pasarla bien y tener noches como ninguna otra\nUna cantina con el mejor ambiente para venir acompañado, pasarla bien y tener noches como ninguna otra.",
  zones: ['Zacatecas', 'Guadalupe'],
  address: "Callejón de la Palma #104 Centro 98000 Zacatecas, ZAC Mexico",
  budget: "$400 - $500 aprox.",
  schedule: "Lunes a domingo. 13:00- 01:30",
  phone: "(492) 218 6696",
  additionalLinks: [
    {
      name: "menú",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "coctelería",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ],
  mainAmenities: Array.from(amenities.values()),
  otherAmenities: Array.from(amenities.values()),
  // idsPromotions: [
    // {
    //   id: '1',
    //   name: 'Los Reyes',
    //   description: 'Martes 2x1 en tacos',
    //   imgUrl: 'https://revistaespejo.com/wp-content/uploads/2017/01/tacos.jpg'
    // }
    // 'FDS',
  // ],
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29872.356783642674!2d-103.3724812!3d20.6270389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428adeb005f7d0d%3A0xdfd4201c4afeab9d!2sMariscos%20Alex!5e0!3m2!1ses!2smx!4v1684904579916!5m2!1ses!2smx",
  socialMedia: [
    {
      name: 'reyes.cantinazac',
      type: 'facebook',
      url:' https://www.facebook.com',
    },
    {
      name: 'cantinareyes.zac',
      type: 'instagram',
      url:' https://www.instagram.com',
    },
  ],
  labels: [
    "Fiesta",
    "Vida nocturna",
  ],
};
