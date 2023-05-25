import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EventsListComponent } from './views/events-list/events-list.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventsListComponent },
  { path: 'evento/:id', component: EventDetailComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
