import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/login/login-layout/login-layout.component';
import { SigninLayoutComponent } from './components/signin/signin-layout/signin-layout.component';
import { ProfileLayoutComponent } from './components/profile/profile-layout/profile-layout.component';
import { ProfileMainComponent } from './components/profile/profile-main/profile-main.component';
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component';

const routes: Routes = [
  { path: 'profile', component: ProfileLayoutComponent, children: [
    { path: 'security', component: ProfileSecurityComponent },
    { path: 'main', component: ProfileMainComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
  ] },
  { path: 'signin', component: SigninLayoutComponent },
  { path: 'login', component: LoginLayoutComponent },
  { path: 'home', component: HomeLayoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
