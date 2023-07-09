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
  public createAllPromotions() {
    const promotionReference = collection(this.firestore, 'Promotion');

    // const promotion: Promotion = {
    //   name: 'Unagui Sushi',
    //   description: 'Jueves 2x1 en rollos',
    //   imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/unagui-sushi%2FUnagui%203.jpg?alt=media&token=a803ab5c-935f-4a8a-a112-e217e817669d',
    //   idPlace: '',
    // };
    const promotion: Promotion = {
      name: 'Unagui Sushi',
      description: 'Jueves 2x1 en hamburguesas',
      imgUrl: '',
      idPlace: '',
    };

      // console.log(addDoc(promotionReference, promotion));
  }

  public async createAllPlaces() {
    const placeReference = collection(this.firestore, 'Place');

    const place: Place = {
      webId: 'tacos-ledezma',
      idCategory: 'qeGgDr9u6zqNxeZffL0y',
      zones: ['Zacatecas', 'Guadalupe'],
      labels: [
        'Hamburguesas',
        'Comida',
        'Restaurante',
        'Hamburguesas',
        'Antojitos',
        'Tacos',
      ],
      name: 'Maranatha Burguer & Tacos',
      shortDescription: 'Somos MARANATHA, preparate para comerte las hamburguesas mas espectaculares de la ciudad',
      address: 'Donato Guerra 310, Zacatecas, Mexico',
      budget: '$150 - 200',
      schedule: 'Lunes a Domingo de 6:30 pm a 12:00 pm',
      // additionalLinks: [
      //   {
      //     name: 'Menú',
      //     url: '',
      //   }
      // ],
      mainAmenities: [
        // amenities.get('Sala de juntas')!,
        amenities.get('Pago con tarjeta')!,
        amenities.get('Pago en efectivo')!,
        amenities.get('Facturacion')!,
        // amenities.get('Para llevar')!,
        amenities.get('Servicio a domicilio')!,
        // amenities.get('Terraza')!,
        amenities.get('Sanitarios')!,
        amenities.get('Internet')!,
        // amenities.get('Reservaciones')!,
      ],
      phone: '(492) 125 7515',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.793354933724!2d-102.5691966!3d22.773048900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824e8f39f7e9ff%3A0x74e22bb448acdcdd!2sMaranatha%20T%26H!5e0!3m2!1ses-419!2smx!4v1688710424393!5m2!1ses-419!2smx',
      socialMedia: [
        {
          type: 'instagram',
          name: 'maranataburguer',
          url: 'https://www.instagram.com/maranataburger/',
        },
      ],
      gallery: [
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/maranata%2FMaranata%201.jpeg?alt=media&token=bc1b5987-0524-4bca-b393-24cd347d9dc2',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/maranata%2Fmaranata%202.jpg?alt=media&token=f8c29c5d-313f-46e9-91cf-a68a0cf2abc6',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/maranata%2Fmaranata%203.jpg?alt=media&token=daf2cacc-601a-4e45-93ed-06848da2388e',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/maranata%2Fmaranata%205.jpg?alt=media&token=a0490f01-65f4-4e58-b80f-dd5baf8a1e3a',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/maranata%2Fmaranata%205.jpg?alt=media&token=a0490f01-65f4-4e58-b80f-dd5baf8a1e3a',
      ],
      logoUrl: ''
    };

    console.log(place);
    // console.log(await addDoc(placeReference, place));
  }

}
