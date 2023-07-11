import { Injectable } from '@angular/core';
import { Firestore, collection, or, and, addDoc, collectionData, doc, getDoc, getDocs, deleteDoc, query, where, orderBy, limit, startAfter, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Place } from 'src/app/models/place.model';

const documentosPorPagina = 16;

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore : Firestore
  ) { }

  /// Buscador en el filtro, busca en labels y nombres ///
  buscadorNegocio(palabra: string) {
    const collectionRef = collection(this.firestore,'Place');

    const queryDB = query(collectionRef,
      or(
        where('labels', 'array-contains', palabra),
        and(
          where('name', '>=', palabra),
          where('name', '<=', palabra + '\uf8ff')
        )
      )
    );

    return collectionData(queryDB, { idField: 'id' }) as Observable<Place[]>;
  }


  getPlacesPorCategoria( idCategoria: string ) {
    const collectionRef = collection(this.firestore,'Place');

    const queryDB = query(collectionRef, where('idCategory', '==', idCategoria));

    return collectionData(queryDB, { idField: 'id' }) as Observable<Place[]>;
  }


  async getPlaceByKey(placeId: string) {
    const docRef = doc(this.firestore, "Place", placeId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return '';
    }

  }

  getPlacesByUrl( idUrl: string ) {
    const collectionRef = collection(this.firestore,'Place');

    const queryDB = query(collectionRef, where('webId', '==', idUrl));

    return collectionData(queryDB, { idField: 'id' }) as Observable<Place[]>;
  }

  async getLastDocument(pagina: number){
    const collectionRef = collection(this.firestore,'Place');

    let cantidad = documentosPorPagina*pagina;

    let next;

    if(cantidad == 0){
      next = query(collectionRef,
        orderBy("name"),
        limit(documentosPorPagina));
    }else{
      const first = query(collectionRef, orderBy("name"), limit(cantidad));

      const documentSnapshots = await getDocs(first);
      console.log("results: ", documentSnapshots);

      //Obtengo el ultimo documento
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      console.log("last", lastVisible);

      next = query(collectionRef,
        orderBy("name"),
        startAfter(lastVisible),
        limit(documentosPorPagina));
    }
    return collectionData(next, { idField: 'id' }) as Observable<Place[]> ;
  }

  getAllCategories() {
    const collectionRef = collection(this.firestore, 'Category');

    const queryDB = query(collectionRef);

    return collectionData(queryDB, { idField: 'id' }) as Observable<Category[]>;
  }

  getAllPlaces() {
    const collectionRef = collection(this.firestore, 'Place');

    const queryDB = query(collectionRef);

    return collectionData(queryDB, { idField: 'id' }) as Observable<Place[]>;
  }

}

