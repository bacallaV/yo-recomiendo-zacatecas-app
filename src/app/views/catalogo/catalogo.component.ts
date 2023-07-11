import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/* Models */
import { Category } from 'src/app/models/category.model';
import { EventModel } from 'src/app/models/event.model';
import { Place } from 'src/app/models/place.model';
import { FirebaseServiceService } from 'src/app/services/firebase-service/firebase-service.service';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';
import { examplePlace } from 'src/app/static/place.static';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogoComponent implements OnInit {

  public categories : Category[] = [
    { id: '1', name: 'Entretenimiento', imgUrl: './assets/images/turismo.jpeg'},
    { id: '2', name: 'Concierto', imgUrl: './assets/images/concierto.jpg'},
    { id: '3', name: 'Restaurantes', imgUrl: './assets/images/turismo.jpeg'},
    { id: '4', name: 'Bares', imgUrl: './assets/images/concierto.jpg'},
    { id: '5', name: 'Postres', imgUrl: './assets/images/turismo.jpeg'},
    { id: '6', name: 'Dulces', imgUrl: './assets/images/concierto.jpg'},
  ]
  // Buscador
  public word: FormControl = new FormControl('');

  //Filtro
  public categoryFilter: Category | undefined | null;

  public places: Place[] = [];
  public featuredEvent: EventModel = exampleEventModel;

  public errors = {
    places: { isErrorActive: false, message: '' },
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirebaseServiceService,
  ) {

  }

  ngOnInit(): void {
    this.enableFilterAddittionByRoute();
    this.getPlaces();
    this.getAllCategories();
  }

  public getPlaces(): void {
    if( Math.random () < 0.2 ) {
      this.errors.places = {
        isErrorActive: true,
        message: 'No se econtraron lugares',
      }
      return;
    }

    this.places = [
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
      examplePlace,
    ];
    // this.getLastDocument(0);
  }

  public getAllCategories(): void {
    this.firestoreService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  async getLastDocument(page: number){
    (await
      this.firestoreService.getLastDocument(page)).subscribe(places => {
        console.log(places);

      this.places = places;
    })

    console.log(this.places);

  }

  public addCategoryFilterToRoute(category: Category) {
    this.router.navigate( [], {
      relativeTo: this.activatedRoute,
      queryParams: { category: category.name },
      // skipLocationChange: true,
    });
  }

  public removeCategoryFilterToRoute(): void {
    this.router.navigate( [], {
      relativeTo: this.activatedRoute,
      queryParams: { category: null },
      queryParamsHandling: 'merge',
      // skipLocationChange: true,
    });
  }

  public enableFilterAddittionByRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const categoryFilterName = params.get('category');
      this.categoryFilter = categoryFilterName ? this.categories.find( c => c.name === categoryFilterName ) : null;
    });
  }

}
