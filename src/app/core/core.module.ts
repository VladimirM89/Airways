import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { BreadcrumpsComponent } from './components/header/components/breadcrumps/breadcrumps.component';
import { ProfileComponent } from './components/header/components/profile/profile.component';
import { AuthComponent } from './components/header/components/auth/auth.component';
import { LoginFormComponent } from './components/header/components/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './components/header/components/auth/components/register-form/register-form.component';

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
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumpsComponent,
  ],
  imports: [BrowserModule, CommonModule, SharedModule],
})
export class CoreModule {}
