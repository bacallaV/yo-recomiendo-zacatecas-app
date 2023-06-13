import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogoComponent implements OnInit {

  public categories : dataCardCategoria[] = [
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.responseFilterLugar('akjskl');

    this.enableFilterAddittionByRoute();
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

  public addCategoryFilterToRoute(category: dataCardCategoria) {
    this.router.navigate( [], {
      relativeTo: this.activatedRoute,
      queryParams: { category: category.name },
      // skipLocationChange: true,
    });
  }

  public enableFilterAddittionByRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.get('category')) {
        this.filterLugar.name = params.get('category');
      }
    });
  }

}
