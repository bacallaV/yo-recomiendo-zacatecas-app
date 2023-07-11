import { Component, OnInit } from '@angular/core';
import Prueba from 'src/app/interfaces/prueba.interface';
import { Place } from 'src/app/models/place.model';
import { FirebaseServiceService } from 'src/app/services/firebase-service/firebase-service.service';
import { PruebaService } from 'src/app/services/prueba/prueba.service';

@Component({
  selector: 'app-prueba-firebase',
  templateUrl: './prueba-firebase.component.html',
  styleUrls: ['./prueba-firebase.component.scss']
})
export class PruebaFirebaseComponent implements OnInit {



  constructor(
    private pruebaService : PruebaService,
    private firestoreService: FirebaseServiceService
  ) {

  }

  async ngOnInit(): Promise<void> {
    // this.addPrueba()
    // this.getByEdad(24);
    this.getFilter('Tacos');

    // this.pruebaService.getPruebas().subscribe(pruebas => {
    //   console.log(pruebas);
    //   pruebas.sort((a, b) => {
    //     const nameA = a.name.toUpperCase();
    //     const nameB = b.name.toUpperCase();
      
    //     if (nameA < nameB) {
    //       return -1;
    //     }
    //     if (nameA > nameB) {
    //       return 1;
    //     }
    //     return 0;
    //   });
      
    //   console.log(pruebas);
    //   // this.onClickDelete(pruebas[0]);
    // })
    // // pagina 0 es la primera paginacion
    // this.getLastDocument(0);
    let res = await this.firestoreService.getPlaceByKey('BgtS0YpA9Jhx7uJThVqV');
    console.log(res);
    

    
  }

  async getFilter(filtroWord:string){
    this.firestoreService.buscadorNegocio(filtroWord).subscribe(pruebas => {
      console.log(pruebas);
    })
  }

  async addPrueba(){
    let prueba : Prueba = {
      name: 'Pedro perez',
      edad: 19
    }
    const response = await this.pruebaService.addPrueba(prueba);
    console.log(response);
  }

  async onClickDelete(prueba:Prueba){
    const response = await this.pruebaService.deletePrueba(prueba);
    console.log(response);
    
  }

  async getByEdad(edad:number){
    this.pruebaService.buscarRegistrosPorEdad(edad).subscribe(pruebas => {
      console.log(pruebas);
    })
  }

  async getLastDocument(page: number){
    // const response = await this.pruebaService.obtenerPagina(page);
    // console.log(response);
    (await
      // const response = await this.pruebaService.obtenerPagina(page);
      // console.log(response);
      this.pruebaService.getLastDocument(page)).subscribe(pruebas => {
      console.log(pruebas);
    })
    
  }

}
