import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/* Models */
import { EventModel } from 'src/app/models/event.model';
import { Category } from 'src/app/models/category.model';
import { Place } from 'src/app/models/place.model';
import { Promotion } from 'src/app/models/promotion.model';
/* Static */
import { exampleEventModel } from 'src/app/static/event.static';
import { examplePlace } from 'src/app/static/place.static';
import { examplePromotion } from 'src/app/static/promotion.static';

import { PruebaService } from 'src/app/services/prueba/prueba.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public contactForm: FormGroup;
  public categories: Category[] = [
    { id: '1', name: 'Entretenimiento', imgUrl: './assets/images/turismo.jpeg'},
    { id: '2', name: 'Concierto', imgUrl: './assets/images/concierto.jpg'},
    { id: '3', name: 'Restaurantes', imgUrl: './assets/images/turismo.jpeg'},
    { id: '4', name: 'Bares', imgUrl: './assets/images/concierto.jpg'},
    { id: '5', name: 'Postres', imgUrl: './assets/images/turismo.jpeg'},
    { id: '6', name: 'Dulces', imgUrl: './assets/images/concierto.jpg'},
  ];
  public featuredPlaces: Place[] = [];
  public featuredPromotions: Promotion[] = [];
  public featuredEvent: EventModel = exampleEventModel;

  public errors = {
    featuredPlaces: {
      isErrorActive: false,
      message: '',
    },
    featuredPromotions: {
      isErrorActive: false,
      message: '',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pruebaService: PruebaService,
  ){


    this.contactForm = this.buildForm();
  }

  ngOnInit(): void {
    this.checkForRouteQueryParams();
    this.getFeaturedPlaces();
    this.getFeaturedPromotions();

    /* Temporary */
    // this.pruebaService.createAllPlaces();
    this.pruebaService.createAllPromotions();
  }

  public buildForm() {
    return this.formBuilder.group({
      name:     [ '', [Validators.required] ],
      phone:    [ '', [Validators.required] ],
      email:    [ '', [Validators.required, Validators.email] ],
      opinion:  [ '', [Validators.required] ],
    });
  }

  private checkForRouteQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const viewValue = params.get('view');

      if( viewValue ) {
        const element = document.getElementById('contact-form__form');

        if( element ) {
          setTimeout( () => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 750 );
        }
      }

    });
  }

  public navigateToCatalogWithCategory(category: Category): void {
    this.router.navigate(['/catalogo'], { queryParams: { category: category.name } });
  }

  public getFeaturedPlaces(): void {
    if( Math.random () < 0.2 ) {
      this.errors.featuredPlaces = {
        isErrorActive: true,
        message: 'No se econtraron lugares destacados',
      }
      return;
    }

    this.featuredPlaces = [
      Object.assign( {}, examplePlace, {webId: 'los-reyes-gpe'}),
      examplePlace,
      examplePlace,
      examplePlace,
      Object.assign( {}, examplePlace, {webId: 'los-reyes-gpe'}),
      examplePlace,
      Object.assign( {}, examplePlace, {webId: 'los-reyes-gpe'}),
    ];
  }

  public getFeaturedPromotions(): void {
    if( Math.random () < 0.2 ) {
      this.errors.featuredPromotions = {
        isErrorActive: true,
        message: 'No se econtraron lugares destacados',
      }
      return;
    }

    this.featuredPromotions = [
      examplePromotion,
      examplePromotion,
      examplePromotion,
      examplePromotion,
    ];
  }

}
