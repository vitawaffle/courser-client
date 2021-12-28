import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'home', component: HomeLayoutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
