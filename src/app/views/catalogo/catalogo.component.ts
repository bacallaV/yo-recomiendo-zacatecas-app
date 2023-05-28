import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  public dataCard : dataCardCategoria[] = [
    { id: 0, name: 'Entretenimiento', src: './assets/images/turismo.jpeg'},
    { id: 0, name: 'Concierto', src: './assets/images/concierto.jpg'},
    { id: 0, name: 'Entretenimiento', src: './assets/images/turismo.jpeg'},
    { id: 0, name: 'Concierto', src: './assets/images/concierto.jpg'},
    { id: 0, name: 'Entretenimiento', src: './assets/images/turismo.jpeg'},
    { id: 0, name: 'Concierto', src: './assets/images/concierto.jpg'},
  ]
  // Buscador
  public word: FormControl = new FormControl('');

  catalogo(){}

  selectRegion(){}
}
