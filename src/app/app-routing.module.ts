import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
