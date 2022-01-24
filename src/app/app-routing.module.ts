import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorLayoutComponent } from './components/errors/error-layout/error-layout.component';
import { PageNotFoundErrorComponent } from './components/errors/page-not-found-error/page-not-found-error.component';
import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { LoginLayoutComponent } from './components/login/login-layout/login-layout.component';
import { SigninLayoutComponent } from './components/signin/signin-layout/signin-layout.component';
import { ProfileLayoutComponent } from './components/profile/profile-layout/profile-layout.component';
import { ProfileMainComponent } from './components/profile/profile-main/profile-main.component';
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component';
import { AvatarsLayoutComponent } from './components/profile/avatars-layout/avatars-layout.component';

const routes: Routes = [
  { path: 'avatars', component: AvatarsLayoutComponent },
  { path: 'profile', component: ProfileLayoutComponent, children: [
    { path: 'security', component: ProfileSecurityComponent },
    { path: 'main', component: ProfileMainComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' },
  ] },
  { path: 'signin', component: SigninLayoutComponent },
  { path: 'login', component: LoginLayoutComponent },
  { path: 'home', component: HomeLayoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'error', component: ErrorLayoutComponent, children: [
    { path: '404', component: PageNotFoundErrorComponent },
    { path: '', redirectTo: '404', pathMatch: 'full' },
  ] },
  { path: '**', redirectTo: '/error/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
