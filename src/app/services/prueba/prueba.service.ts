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
      webId: 'cafe-punta-del-cielo',
      idCategory: 'qeGgDr9u6zqNxeZffL0y',
      zones: ['Zacatecas', 'Guadalupe'],
      labels: [
        'Cafetería',
        'Cafe',
        'Pan',
        'Categoria',
        'Coffee',
        'Gourmet',
        'Cafes',
        'Frapuchino',
        'Pancake',
        'Italian coffee',
      ],
      name: 'Café punta del Cielo',
      shortDescription: 'Es una empresa mexicana dedicada a la produccion, venta y distribuccion de cafe gourmet',
      address: 'Boulevard Paseo del Bote, Zacatecas, 98040, 98160 Zacatecas, Zacatecas',
      // budget: '',
      schedule: 'Lunes a Domingo 8:00 am a 11 pm',
      additionalLinks: [
        {
          name: 'Menú',
          url: 'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FMENU%20PUNTA%20DEL%20CIELO.pdf?alt=media&token=994e3943-91aa-48e3-99f2-d85f43cf86b1',
        }
      ],
      mainAmenities: [
        amenities.get('Sala de juntas')!,
        amenities.get('Pago con tarjeta')!,
        // amenities.get('Pago en efectivo')!,
        amenities.get('Facturacion')!,
        amenities.get('Para llevar')!,
        amenities.get('Servicio a domicilio')!,
        // amenities.get('Terraza')!,
        amenities.get('Sanitarios')!,
        amenities.get('Internet')!,
        amenities.get('Reservaciones')!,
      ],
      phone: '(492) 925 5812',
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.685567889644!2d-102.59871749999999!3d22.7770474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824e734bc82a4f%3A0x587bcf2a921e6fbb!2sCaf%C3%A9%20Punta%20Del%20Cielo!5e0!3m2!1ses-419!2smx!4v1688881606754!5m2!1ses-419!2smx',
      socialMedia: [
        {
          type: 'facebook',
          name: 'PuntaDelCieloZac',
          url: 'https://www.facebook.com/PuntadelCieloZac/',
        },
      ],
      gallery: [
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1651433555443.jpg?alt=media&token=92b39831-f616-46b7-9870-9f2efea864bf',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1651433656020.jpg?alt=media&token=6d6bcdd8-c832-48c0-8098-91ecb4de76a0',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1652445233521.jpg?alt=media&token=68addd4d-e369-4284-be73-8dcd842c947c',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1652445250193.jpg?alt=media&token=f1c3509f-efac-4b7a-b224-6e91ce920ca0',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1652445262086.jpg?alt=media&token=3fcab6a7-5f63-4881-aeda-ac51f01baef7',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1654452153775.jpg?alt=media&token=9b76b395-3d68-4e04-8b97-9ed5f08bdc33',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1654452167028.jpg?alt=media&token=a4f03131-51bc-4a24-95a4-b8e976827dd4',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1654452170824.jpg?alt=media&token=5ad24aca-dd6e-4360-94ec-1ff725207c34',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1654452177097.jpg?alt=media&token=b33dcbc0-008b-4447-9b8b-65d5f13bba8b',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1654452195803.jpg?alt=media&token=18e7b606-c008-40cf-ace8-1c1e0276ee79',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1658432982749.jpg?alt=media&token=fc877738-e290-4543-b102-c9ccdbe5c341',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1658433024631.jpg?alt=media&token=10e2ed79-c717-4503-bd1f-9e6dbc8238f6',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1658433033473.jpg?alt=media&token=3afd5865-a7ae-4660-a7ab-ef5fbe874970',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1658433043189.jpg?alt=media&token=e38ad4f0-3e91-4607-8572-873550f98ef6',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FFB_IMG_1660759481198.jpg?alt=media&token=03477fec-0dd8-4ba2-a048-c4865444638a',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FIMG_20220504_172859.jpg?alt=media&token=7da5dd94-2350-4779-9687-75ccae5e3987',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FIMG_20220504_172925.jpg?alt=media&token=e2b78725-3a75-4bfa-ae6e-91ed21b83540',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FIMG_20220504_172941.jpg?alt=media&token=0a3fbb80-b333-46fa-a9c5-9048f7cc3fdd',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FPicsart_22-11-25_09-45-24-514.jpg?alt=media&token=09c77604-ac07-43dc-a1ed-43418d451206',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FPicsart_22-12-01_18-19-57-517.jpg?alt=media&token=99755e57-a137-4dfc-a062-d5a2c17e08d4',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FPicsart_23-02-15_13-46-38-910.jpg?alt=media&token=92c5198c-b6da-4033-8ac7-fba7cc165a60',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FPicsart_23-03-23_11-39-18-191.jpg?alt=media&token=d4c20efb-a784-433c-822d-0c21b6109a71',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2FPicsart_23-04-08_15-11-48-829.jpg?alt=media&token=c880263b-46b9-454e-8f85-26780add1119',
        'https://firebasestorage.googleapis.com/v0/b/yo-recomiendo-zac.appspot.com/o/cafe-punta-del-cielo%2Fcafe.png?alt=media&token=5eafd78b-92ea-4257-a559-72763100d52c',
      ],
      logoUrl: ''
    };

    console.log(place);
    console.log(await addDoc(placeReference, place));
  }

}
