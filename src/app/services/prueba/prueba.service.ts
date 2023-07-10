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
      webId: 'wings-army',
      idCategory: 'qeGgDr9u6zqNxeZffL0y',
      zones: ['Zacatecas', 'Guadalupe'],
      labels: [
        'Alitas',
        'Comida',
        'Restaurante',
        'Cerveza',
        'Papas',
        'Hamburguesas',
      ],
      name: 'Wing\'s Army',
      shortDescription: 'La mejor combinacion de alitas con cerveza solo en Wings Army',
      address: 'Calle arroyo de la plata 1c Av. Garcia Salinas Guadalupe Zacatecas',
      // budget: '',
      schedule: 'Lunes, Martes, Miercoles y Domingo 1:00 pm a 11:30 pm Jueves, Viernes y Sabado de 1:00 pm a 12:30 am',
      additionalLinks: [
        {
          name: 'Menú',
          url: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FMENU%20WINGS%20ARMY.pdf?alt=media&token=c17ed75c-8913-4fb8-bdf0-034a4cc3fd75',
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
      phone: '(492) 9233 405',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29433.973986863795!2d-102.5626395!3d22.7562224!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14075c5bf751dba1%3A0xd01d5dae450064ea!2sWING&#39;S%20ARMY!5e0!3m2!1ses-419!2smx!4v1689001731698!5m2!1ses-419!2smx',
      socialMedia: [
        {
          type: 'facebook',
          name: 'WingsArmyZac',
          url: 'https://www.facebook.com/WingsArmyZac/',
        },
      ],
      gallery: [
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F319081836_515477590607869_7857689531249565936_n.jpeg?alt=media&token=7159164e-2e5c-495f-b6e9-b366f392b688',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F321415985_866016661280468_1902542417176339945_n.jpeg?alt=media&token=2bf06a99-a198-4d46-959c-6dbb4cc6e444',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F323106970_935675961130505_648738135417312623_n.jpeg?alt=media&token=01abc38f-81cb-4854-982f-64a7edaff386',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F324261386_1651353798655324_3601589910077764651_n.jpeg?alt=media&token=18c2d64a-1e88-4c5c-8f0c-cdb963b7ba5c',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F324464451_1325715804849000_2607380638471421659_n.jpeg?alt=media&token=c26b6839-b757-4b45-9f7c-7a103774a4be',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F324566641_505400684915765_2952768408488236281_n.jpeg?alt=media&token=0c0b6e02-6dc1-43ec-9c06-b49c64be2676',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2F324591494_701104214762539_40604613139159104_n.jpeg?alt=media&token=5ac66240-f96d-4c43-9fbc-9f688cc1c91b',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FCopia%20de%20burger%20tender%20story.png?alt=media&token=859ed5ce-6b07-4bdd-908c-12e4ef1d2530',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651364929198.jpg?alt=media&token=8227af81-8ac2-4534-9b33-860b780b729d',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651364941163.jpg?alt=media&token=aaa666cd-20a8-4258-b511-d4cfb1a78494',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651364962582.jpg?alt=media&token=fac2cbe4-bddb-4bfc-b904-8ae71e77378a',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651433078525.jpg?alt=media&token=38fec3a6-4c5b-4c25-9c44-13b105faa41e',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651433088403.jpg?alt=media&token=6ada7546-f21c-4502-8ef7-a9f02e382ada',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651433105130.jpg?alt=media&token=db830400-58e7-4eeb-956d-7c8ac7953488',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1651433133291.jpg?alt=media&token=c0b842ef-0289-4f5d-bfb3-4825cce8f66e',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1654209648541.jpg?alt=media&token=a1f6fef6-1708-4a75-92b0-c38e49865519',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1654209656722.jpg?alt=media&token=1f93b89b-fde9-4369-88a6-7e8f6c1a6678',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FFB_IMG_1654303240730.jpg?alt=media&token=f01e05dc-721a-459f-8c09-032f31223a95',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220429_143928.jpg?alt=media&token=4f76058f-c623-4d8c-af94-1d70e63595c0',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220429_143945.jpg?alt=media&token=0db46c96-f407-47b4-bd02-0ea731bc8438',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220429_144024.jpg?alt=media&token=bfda7e5b-ef9f-43fa-8f57-3f3aec5aa184',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220429_144106.jpg?alt=media&token=ab48fe2e-8c23-4000-a15b-ac1e1d1ce735',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220429_144124.jpg?alt=media&token=f31ed167-4c21-4331-b574-0e4285adf859',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220512_123806.jpg?alt=media&token=af1dd0ba-38d9-4fce-808b-62c30936d055',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220512_123818.jpg?alt=media&token=02aecb81-d73c-4027-8410-fa3735d85f9c',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220512_123830.jpg?alt=media&token=2356c582-3ad9-4307-92fe-8a6b47105a8d',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220512_123844.jpg?alt=media&token=0fbb9ff7-0026-4426-9e4d-181af0dbfb83',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220520_162431.jpg?alt=media&token=8f1a681b-099d-4b46-8393-cc2325029db1',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220529_192549.jpg?alt=media&token=d9a04961-b28b-4dcc-b8fc-0ac55da14825',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220604_153809.jpg?alt=media&token=6e9d88c0-d221-4935-9513-be5a3e5fc3c6',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120607.jpg?alt=media&token=3440d4b3-8f48-42ba-812b-e26f0a811bef',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120650.jpg?alt=media&token=d29cd053-617d-4b1d-a360-baa9c9c6ffa7',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120710.jpg?alt=media&token=a5799281-a463-4843-8ab7-17fffe896f13',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120731.jpg?alt=media&token=3d76d741-9b28-4d9b-9b9d-9c55f9deea14',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120755.jpg?alt=media&token=4487f86c-86c3-4895-b5d0-f16c0855455f',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120856.jpg?alt=media&token=025b40a5-89a9-42c7-8a8a-f84f4f988ccb',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220605_120916.jpg?alt=media&token=c1d64c5c-fa5f-4c69-815b-7d9c63b8ad78',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220611_135143.jpg?alt=media&token=9c613d6b-7e3a-482a-8266-a7b94bf68d94',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_20220611_135203.jpg?alt=media&token=3cc70518-cf6d-4b65-b191-4df0febf657c',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_8240.jpg?alt=media&token=b4a7c58c-dd25-4794-a77a-e9a9531dbb39',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_8261.jpg?alt=media&token=fe5fec8b-30d4-4a9c-85ec-06b150566809',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_8284.jpg?alt=media&token=041395af-0a91-4521-961e-4a9ced8a992f',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FIMG_8292.jpg?alt=media&token=9255a844-de54-4dc6-9d47-6f5ed6a142ec',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/wings-army%2FPicsart_22-12-10_15-19-13-848.jpg?alt=media&token=89aa6e61-451a-441b-b19c-cdf316c8d76b',
      ],
      logoUrl: ''
    };

    console.log(place);
    console.log(await addDoc(placeReference, place));
  }

}
