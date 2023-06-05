import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([
  Pagination,
  Navigation,
  Autoplay,
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public contactForm: FormGroup;

  public facebookUrl = environment.facebookUrl;
  public instagramUrl = environment.instagramUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ){
    this.matIconRegistry.addSvgIcon(
      `app-menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/menu.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/facebook.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `instagram`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/instagram.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `youtube`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/youtube.svg`)
    );

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

        if( element && element.length > 0 ) element[0]!.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    });
  }

}
