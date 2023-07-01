/* Angular */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* Project base */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Views */
import { HomeComponent } from './views/home/home.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventsListComponent } from './views/events-list/events-list.component';
import { PlaceDetailComponent } from './views/place-detail/place-detail.component';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

/* Installed modules */
import { SwiperModule } from 'swiper/angular';

/* Layouts */
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

/* Components */
import { CardContractComponent } from './components/card-contract/card-contract.component';
import { CardContractImageComponent } from './components/card-contract-image/card-contract-image.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventBannerComponent } from './components/event-banner/event-banner.component';
import { PromotionsBannerComponent } from './components/promotions-banner/promotions-banner.component';
import { ImagesInDetailComponent } from './components/images-in-detail/images-in-detail.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

/* Firebase */
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PruebaFirebaseComponent } from './views/prueba-firebase/prueba-firebase.component';

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
    FooterComponent,
    EventBannerComponent,
    PromotionsBannerComponent,
    EventDetailComponent,
    EventsListComponent,
    PlaceDetailComponent,
    ImagesInDetailComponent,
    AppLayoutComponent,
    PlaceCardComponent,
    CategoryCardComponent,
    SearchBarComponent,
    PruebaFirebaseComponent,
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
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
