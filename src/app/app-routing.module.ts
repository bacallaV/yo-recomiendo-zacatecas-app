import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { HomeComponent } from './views/home/home.component';
import { EventsListComponent } from './views/events-list/events-list.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { PlaceDetailComponent } from './views/place-detail/place-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventsListComponent },
  { path: 'evento/:id', component: EventDetailComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'lugar/:id', component: PlaceDetailComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
