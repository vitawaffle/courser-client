import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptor-providers';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/share/layout/layout.component';
import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { HeaderComponent } from './components/share/header/header/header.component';
import { HeaderLinkComponent } from './components/share/header/header-link/header-link.component';
import { LoginLayoutComponent } from './components/login/login-layout/login-layout.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { InvalidFeedbackComponent } from './components/share/forms/invalid-feedback/invalid-feedback.component';
import { SubmitButtonComponent } from './components/share/forms/submit-button/submit-button.component';
import { SigninLayoutComponent } from './components/signin/signin-layout/signin-layout.component';
import { SigninFormComponent } from './components/signin/signin-form/signin-form.component';
import { CopyrightComponent } from './components/share/copyright/copyright.component';
import { ProfileLayoutComponent } from './components/profile/profile-layout/profile-layout.component';
import { ProfileMainComponent } from './components/profile/profile-main/profile-main.component';
import { ProfileLinkComponent } from './components/profile/profile-link/profile-link.component';
import { ProfileSecurityComponent } from './components/profile/profile-security/profile-security.component';
import { PasswordChangeFormComponent } from './components/profile/password-change-form/password-change-form.component';
import { EmailConfirmationAlertComponent } from './components/profile/email-confirmation-alert/email-confirmation-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeLayoutComponent,
    HeaderComponent,
    HeaderLinkComponent,
    LoginLayoutComponent,
    LoginFormComponent,
    InvalidFeedbackComponent,
    SubmitButtonComponent,
    SigninLayoutComponent,
    SigninFormComponent,
    CopyrightComponent,
    ProfileLayoutComponent,
    ProfileMainComponent,
    ProfileLinkComponent,
    ProfileSecurityComponent,
    PasswordChangeFormComponent,
    EmailConfirmationAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
