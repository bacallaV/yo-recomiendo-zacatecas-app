import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';

/* Modules */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CardCategoriaComponent } from './components/card-categoria/card-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
/* Installed modules */
import { SwiperModule } from 'swiper/angular';
/* Components */
import { CardContractComponent } from './components/card-contract/card-contract.component';
import { CardContractImageComponent } from './components/card-contract-image/card-contract-image.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventBannerComponent } from './components/event-banner/event-banner.component';
import { PromotionsBannerComponent } from './components/promotions-banner/promotions-banner.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventsListComponent } from './views/events-list/events-list.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardContractComponent,
    CardContractImageComponent,
    NavbarComponent,
    CatalogoComponent,
    CardCategoriaComponent,
    FooterComponent,
    EventBannerComponent,
    PromotionsBannerComponent,
    EventDetailComponent,
    EventsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
