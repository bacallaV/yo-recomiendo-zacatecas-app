import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {


  // Buscador
  public word: FormControl = new FormControl('');

  catalogo(){}

  selectRegion(){}
}
