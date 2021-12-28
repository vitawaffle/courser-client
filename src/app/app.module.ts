import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/share/layout/layout.component';
import { HomeLayoutComponent } from './components/home/home-layout/home-layout.component';
import { HeaderComponent } from './components/share/header/header/header.component';
import { HeaderLinkComponent } from './components/share/header/header-link/header-link.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeLayoutComponent,
    HeaderComponent,
    HeaderLinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
