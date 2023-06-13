import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogoComponent implements OnInit {

  public dataCard : dataCardCategoria[] = [
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
  ]
  // Buscador
  public word: FormControl = new FormControl('');

  //Filtro
  public filterLugar: any;

  ngOnInit(): void {
    this.responseFilterLugar('akjskl');
  }

  catalogo(){}

  selectRegion(){}

  responseFilterLugar(event: any){
    // this.filterLugar = event;
    // this.getList();
    this.filterLugar = {
      name: 'Pizzas'
    }
  }

}
