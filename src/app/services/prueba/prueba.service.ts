import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getDocs, deleteDoc, query, where, orderBy, limit, startAfter, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Prueba from 'src/app/interfaces/prueba.interface';
import { Place } from 'src/app/models/place.model';
import { Promotion } from 'src/app/models/promotion.model';
import { amenities } from 'src/app/static/amenities.static';

const documentosPorPagina = 3;

@Injectable({
  providedIn: 'root'
})
export class PruebaService {


  constructor(
    private firestore : Firestore,
  ) { }

  addPrueba(prueba: Prueba){
    const pruebaRef = collection(this.firestore,'prueba');
    return addDoc(pruebaRef, prueba);
  }

  getPruebas(): Observable<Prueba[]>{
    const pruebaRef = collection(this.firestore,'prueba');
    return collectionData(pruebaRef, { idField: 'id'}) as Observable<Prueba[]>;
  }

  deletePrueba(prueba: Prueba){
    const pruebaDocRef = doc(this.firestore, `prueba/${prueba.id}`);
    return deleteDoc(pruebaDocRef);
  }

  buscarRegistrosPorEdad(edad: number) {
    const pruebaRef = collection(this.firestore,'prueba');
    const queryDB = query(pruebaRef, where('edad', '==', edad));
    return collectionData(queryDB, { idField: 'id' }) as Observable<Prueba[]>;
  }

  buscarRegistrosPorPalabra(palabra: string) {
    const pruebaRef = collection(this.firestore,'prueba');
    const queryDB = query(pruebaRef,
      where('categorias', 'array-contains', palabra.toLowerCase()),
      where('nombre', '>=', palabra.toLowerCase()),
      where('nombre', '<=', palabra.toLowerCase() + '\uf8ff')
    );

    return collectionData(queryDB, { idField: 'id' }) as Observable<Prueba[]>;
  }

  obtenerPagina(pagina: number) {

    // const pruebaRef = collection(this.firestore,'prueba');

    // const queryDB = query( pruebaRef,
    //     orderBy('name'), // Ordena por el campo "name" para obtener una ordenación consistente
    //     limit(documentosPorPagina),
    //     startAfter(this.getLastDocument(pagina - 1))
    // );

    // return collectionData(queryDB, { idField: 'id' }) as Observable<Prueba[]>;
  }

  async getLastDocument(pagina: number){
    const pruebaRef = collection(this.firestore,'prueba');

    // const first = query(pruebaRef, orderBy("name"), limit(3));
    // const documentSnapshots = await getDocs(first);
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", lastVisible);

    // const next = query(pruebaRef,
    // orderBy("name"),
    // startAfter(lastVisible),
    // limit(3));

    // const documentNextSnapshots = await getDocs(next);
    // console.log(documentNextSnapshots.docs);

    let cantidad = documentosPorPagina*pagina;

    // Obtengo todo el primer grupo de registros completo anterior al que buscare ahora


    let next;
    if(cantidad == 0){
      next = query(pruebaRef,
        orderBy("name"),
        limit(3));
    }else{
      const first = query(pruebaRef, orderBy("name"), limit(cantidad));

      const documentSnapshots = await getDocs(first);
      console.log("results: ", documentSnapshots);

      //Obtengo el ultimo documento
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log("last", lastVisible);

      next = query(pruebaRef,
        orderBy("name"),
        startAfter(lastVisible),
        limit(3));
    }



    return collectionData(next, { idField: 'id' }) as Observable<Prueba[]> ;

    // Recupera el último documento de la página anterior
    // const ultimaPagina = paginaAnterior * documentosPorPagina;
    // const queryDB = query(
    //   collection(this.firestore, 'prueba'),
    //     orderBy('name'),
    //     limit(ultimaPagina)
    // );

    // const documentSnapshots = await getDocs(queryDB);
    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];


    // const lastDocument = await collectionData(queryDB, { idField: 'id' }) as Observable<Prueba[]>;
    // const lastDocument2 = await getDoc(doc(pruebaRef,));
    // console.log(lastDocument);

    // return lastVisible?.id;
    // return '';

  }


  // public createAllCategories() {
  //   const pruebaRef = collection(this.firestore,'Category');

  //   const categories: Category_[] = [
  //     {
  //       name: 'Lugares imperdibles',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/lugares-imperdibles.jpg?alt=media&token=08b5b9f9-ad2b-47a6-9660-d1cd70a3e1d0',
  //     },
  //     {
  //       name: 'Para tu evento',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/para-tu-evento.jpg?alt=media&token=319396b8-8354-4b3c-b744-75b0d7140379',
  //     },
  //     {
  //       name: 'Diversión',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/diversion.jpg?alt=media&token=ee357c7a-64c9-45e7-b67a-e8a1e6ad5de9',
  //     },
  //     {
  //       name: 'Gastronomía',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/gastronomia.jpg?alt=media&token=90ea867b-9b59-4c7d-a8e6-550b629c8ade',
  //     },
  //     {
  //       name: 'Para el turismo',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/turismo-zacatecas.jpeg?alt=media&token=edb0e75e-1449-4d87-8e68-c9b0e842b85e',
  //     },
  //     {
  //       name: 'Estilo de vida',
  //       imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/estilo-de-vida.jpg?alt=media&token=536b3f31-33ed-47ee-9614-46d2e3e9e5b7',
  //     },
  //   ];

  //   for (const category of categories) {
  //     // console.log(category);
  //     // console.log(addDoc(pruebaRef, category));
  //   }
  // }
  public async createAllPromotions() {
    const promotionReference = collection(this.firestore, 'Promotion');

    const promotion: Promotion = {
      name: 'Wing\'s Army',
      description: 'Lunes megas por $49.00 pesos',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220512_123830.jpg?alt=media&token=2356c582-3ad9-4307-92fe-8a6b47105a8d',
      idPlace: '',
    };

    const promotion2: Promotion = {
      name: 'Wing\'s Army',
      description: 'Martes all you can eat Alitas & Boneless',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651364929198.jpg?alt=media&token=8227af81-8ac2-4534-9b33-860b780b729d',
      idPlace: '',
    };

    const promotion3: Promotion = {
      name: 'Wing\'s Army',
      description: 'Jueves limonada gratis',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FPicsart_22-12-10_15-19-13-848.jpg?alt=media&token=89aa6e61-451a-441b-b19c-cdf316c8d76b',
      idPlace: '',
    };

      console.log(await addDoc(promotionReference, promotion));
      console.log(await addDoc(promotionReference, promotion2));
      console.log(await addDoc(promotionReference, promotion3));
  }

  public async createAllPlaces() {
    const placeReference = collection(this.firestore, 'Place');

    const place: Place = {
      webId: 'balcones-de-la-revolucion',
      idCategory: 'qeGgDr9u6zqNxeZffL0y',
      zones: ['Zacatecas', 'Guadalupe'],
      labels: [
        'Comida mexicana',
        'Comida',
        'Restaurante',
        'Desayunos',
        'Mexicana',
        'Cortes',
        'Cerveza',
        'Chilaquiles',
        'Ensaladas',
        'Enchiladas',
        'Flautas',
        'Pozole',
        'Quesadilla',
        'Huevos',
        'Hotcakes',
        'Queso fundido',
      ],
      name: 'Los Balcones de la Revolución',
      shortDescription: 'Museo- Restaurante de comida tipica mexicana que ofrece un gran deleite de sabor, con la mejor vista zacatecana',
      address: 'Av. Hidalgo 621, Zacatecas, Zac',
      // budget: '',
      schedule: 'Todos los dias de 8:30 am a 11:00 pm',
      additionalLinks: [
        {
          name: 'Menú de comidas',
          url: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FCOMIDAS%20BALCONES.pdf?alt=media&token=9e50ec7a-9b4e-4859-a5af-dd883c06bf66',
        },
        {
          name: 'Menú de desayunos',
          url: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FDESAYUNOS%20BALCONES%20.pdf?alt=media&token=9bb6e0c9-9698-4b07-8f00-ac46063712ef',
        }
      ],
      mainAmenities: [
        // amenities.get('Sala de juntas')!,
        amenities.get('Pago con tarjeta')!,
        // amenities.get('Pago en efectivo')!,
        amenities.get('Facturacion')!,
        amenities.get('Para llevar')!,
        amenities.get('Servicio a domicilio')!,
        // amenities.get('Terraza')!,
        amenities.get('Sanitarios')!,
        amenities.get('Internet')!,
        amenities.get('Valet parking')!,
        amenities.get('Reservaciones')!,
      ],
      phone: '(492) 491 1273',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.7135858876845!2d-102.57243470000002!3d22.7760081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824fe7a1cf8cc9%3A0x8f897fd7619f7944!2sLos%20Balcones%20de%20la%20Revoluci%C3%B3n!5e0!3m2!1ses-419!2smx!4v1689030454229!5m2!1ses-419!2smx',
      socialMedia: [
        {
          type: 'facebook',
          name: 'BALCONESREVOLZAC',
          url: 'https://www.facebook.com/BALCONESREVOLZAC/',
        },
      ],
      gallery: [
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FCOMBO.png?alt=media&token=41aa6b73-f32e-45be-bba1-ab2bfe549ca0',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG-20221118-WA0028.jpg?alt=media&token=78f4a4eb-4175-4a2f-a3ca-42bb3701c94c',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_20221101_231432_439.jpg?alt=media&token=d1f77755-7cca-4a32-a1bc-46bc4556442d',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_20221101_231545_843.jpg?alt=media&token=5773f31a-4b72-4ff6-9480-20529db02e2a',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_20221123_192516_700.jpg?alt=media&token=b013598c-8138-4deb-842c-2003e815aba0',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_20221208_182922_040.jpg?alt=media&token=1ff199e4-4c33-4d0e-aacc-f780f65d3e3b',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2275.JPG?alt=media&token=25c3d597-8ddc-4761-8d48-2ddeb81e7dcd',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2276.JPG?alt=media&token=f3eade7a-3d36-41ca-a09c-2279ab72add7',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2332.JPG?alt=media&token=392b998d-34c9-4229-a570-aadf3830e222',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2447.JPG?alt=media&token=0e120dde-2a5c-4fb1-a609-12f783cb3202',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2522.JPG?alt=media&token=f4c48c54-fe6b-46a0-8234-24f2886177a9',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2567.JPG?alt=media&token=f1adaaea-18cf-4228-80da-f94336f8909f',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2579.JPG?alt=media&token=630ac6cf-7206-46f2-bf93-0da5de5a72f3',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2592.JPG?alt=media&token=55c254dc-096a-4aca-9ba2-21ed6f357aae',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2599.JPG?alt=media&token=9cba67b0-a4c9-433d-862d-05f10ba3f5aa',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2602.JPG?alt=media&token=86d7af30-c25b-49d6-bae2-3ac22cb29322',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2612.JPG?alt=media&token=e91f4b4e-82af-487c-b61e-584b6b6a04c1',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2630.JPG?alt=media&token=72185ba0-76b1-4fbb-8bbf-72be1588d193',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FIMG_2679.JPG?alt=media&token=ccb5d99e-8f23-4da7-8ae3-7c5e79b6c3df',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FPicsart_22-11-02_06-50-44-249.jpg?alt=media&token=c7f925a6-4e4c-487d-99f2-33dd01ed39ec',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FPicsart_22-12-05_18-13-58-874.jpg?alt=media&token=e3b2e7a3-01c5-4cbe-9436-81dcc7dc9171',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FPicsart_23-03-22_11-23-26-176.jpg?alt=media&token=969e1705-d563-4dbf-803e-a5ad1f09cf2a',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FPicsart_23-03-23_08-55-43-728.jpg?alt=media&token=c997fa69-f9e5-4e91-9465-bb335025ce6e',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/los-balcones-de-la-revolucion%2FPicsart_23-04-04_17-49-11-601.jpg?alt=media&token=1629e433-b7ba-4305-8c45-1a4c7f9fc105',
      ],
      logoUrl: ''
    };

    console.log(place);
    console.log(await addDoc(placeReference, place));
  }

}
