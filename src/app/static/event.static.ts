import { EventModel } from '../models/event.model';

export const exampleEventModel: EventModel = {
  id: 'id',
  webId: 'aniversario-fundación-de-la-ciudad',
  name: 'Aniversario fundación de la ciudad',
  description: 'Encuentra aquí información importante sobre un evento que puede solicitarse',
  bannerImgUrl: 'https://www.balletfolkloricodemexico.com.mx/wp-content/uploads/2016/11/galeria-ballet-revolucion-4.png',
  category: {
    id: '1',
    name: 'Folklor',
  },
  address: 'Callejón de la Palma #104 Centro 98000 Zacatecas, ZAC Mexico',
  budget: '$400 - $500 aprox.',
  eventDate: new Date(),
  additionalLinks: [
    {
      name: 'menú de comida',
      url: 'https://www.orimi.com/pdf-test.pdf',
    },
    {
      name: 'menú de bebidas',
      url: 'https://www.orimi.com/pdf-test.pdf',
    },
  ],
  mainAmenities: [
    {
      name: 'Servicios (pago con tarjeta)',
      icon: 'credit_card',
    },
    {
      name: 'Facturación',
      icon: 'monetization_on',
    },
    {
      name: 'Servicio para llevar',
      icon: 'directions_car',
    },
    {
      name: 'Valet parking',
      icon: 'key',
    },
    {
      name: 'Terraza',
      icon: 'park',
    },
    {
      name: 'Internet',
      icon: 'wifi',
    },
    {
      name: 'Sanitario',
      icon: 'wash',
    },
  ],
  otherAmenities: [
    {
      name: 'Terraza',
      icon: 'park',
    },
    {
      name: 'Internet',
      icon: 'wifi',
    },
    {
      name: 'Sanitario',
      icon: 'wash',
    },
  ],
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29872.356783642674!2d-103.3724812!3d20.6270389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428adeb005f7d0d%3A0xdfd4201c4afeab9d!2sMariscos%20Alex!5e0!3m2!1ses!2smx!4v1684904579916!5m2!1ses!2smx',
  socialMedia: [
    {
      name: 'aniversario.ciudad',
      type: 'facebook',
      url:' https://www.facebook.com',
    },
    {
      name: 'aniversario.ciudad.cool',
      type: 'instagram',
      url:' https://www.instagram.com',
    },
  ],
  labels: []
};
