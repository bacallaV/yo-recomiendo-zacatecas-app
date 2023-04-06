import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CardContractComponent } from './components/card-contract/card-contract.component';
import { HttpClientModule } from '@angular/common/http';
import { CardContractImageComponent } from './components/card-contract-image/card-contract-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardContractComponent,
    CardContractImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
