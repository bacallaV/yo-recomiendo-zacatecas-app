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
import { FirebaseServiceService } from 'src/app/services/firebase-service/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public contactForm: FormGroup;
  public categories: Category[] = [];
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
    private firebaseService: FirebaseServiceService,
  ){


    this.contactForm = this.buildForm();
  }

  ngOnInit(): void {
    this.checkForRouteQueryParams();
    this.getFeaturedPlaces();
    this.getFeaturedPromotions();
    this.getAllCategories();

    /* Temporary */
    // this.pruebaService.createAllPlaces();
    // this.pruebaService.createAllPromotions();
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

    // if( Math.random () < 0.2 ) {
    //   this.errors.featuredPlaces = {
    //     isErrorActive: true,
    //     message: 'No se econtraron lugares destacados',
    //   }
    //   return;
    // }

    this.firebaseService.getAllPlaces().subscribe(data => {
      this.featuredPlaces = data;
    });


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

  public getAllCategories(): void {
    this.firebaseService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  public getCategoryById( id: string ): Category | undefined {
    return this.categories.find(c => c.id === id);
  }

}
