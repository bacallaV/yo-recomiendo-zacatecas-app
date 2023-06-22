import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { environment } from 'src/environments/environment';

import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([
  Pagination,
  Navigation,
  Autoplay,
]);

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {

  public facebookUrl = environment.URL_FACEBOOK;
  public instagramUrl = environment.URL_INSTAGRAM;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
  ) {
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
  }
}
