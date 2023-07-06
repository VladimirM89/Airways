import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { BreadcrumpsComponent } from './components/header/components/breadcrumps/breadcrumps.component';
import { ProfileComponent } from './components/header/components/profile/profile.component';

import { CartComponent } from './components/header/components/cart/cart.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/components/register-form/register-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumpsComponent,
    ProfileComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CartComponent,
  ],
  imports: [BrowserModule, CommonModule, SharedModule, HttpClientModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumpsComponent,
    HttpClientModule,
  ],
})
export class CoreModule {}
