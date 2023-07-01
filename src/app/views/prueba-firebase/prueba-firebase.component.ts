import { Component, OnInit } from '@angular/core';
import Prueba from 'src/app/interfaces/prueba.interface';
import { PruebaService } from 'src/app/services/prueba/prueba.service';

@Component({
  selector: 'app-prueba-firebase',
  templateUrl: './prueba-firebase.component.html',
  styleUrls: ['./prueba-firebase.component.scss']
})
export class PruebaFirebaseComponent implements OnInit {



  constructor(
    private pruebaService : PruebaService
  ) {

  }

  ngOnInit(): void {
    // this.addPrueba()
    // this.getByEdad(24);
    this.getLastDocument(2);

    // this.pruebaService.getPruebas().subscribe(pruebas => {
    //   console.log(pruebas);
    //   this.onClickDelete(pruebas[0]);
    // })

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
    const response = await this.pruebaService.obtenerPagina(page);
    console.log(response);
    
  }

}
