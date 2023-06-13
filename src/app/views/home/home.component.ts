import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dataCardCategoria } from 'src/app/interfaces/data-card-categoria.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public contactForm: FormGroup;
  public categories: dataCardCategoria[] = [
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
    { name: 'Entretenimiento', img: './assets/images/turismo.jpeg'},
    { name: 'Concierto', img: './assets/images/concierto.jpg'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){


    this.contactForm = this.buildForm();
  }

  ngOnInit(): void {
    this.checkForRouteQueryParams();
  }

  public buildForm() {
    return this.formBuilder.group({
      name:     [ '', [Validators.required] ],
      phone:    [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
      email:    [ '', [Validators.required, Validators.email] ],
      opinion:  [ '', [Validators.required] ],
    });
  }

  private checkForRouteQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const viewValue = params.get('view');

      if( viewValue ) {
        const element = document.getElementsByClassName('contact-form');

        if( element && element.length > 0 ) {
          setTimeout( () => element[0]!.scrollIntoView({ behavior: 'smooth', block: 'center' }), 750 );
        }
      }

    });
  }

  public navigateToCatalogWithCategory(category: dataCardCategoria) {
    this.router.navigate(['/catalogo'], { queryParams: { category: category.name } });
  }

}
