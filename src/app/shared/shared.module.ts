/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PersonalInfoFormComponent } from './components/passengers-info-form/personal-info-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CountryCodeFilterPipe } from './pipes/country-code-filter.pipe';
import { AirportFilterPipe } from './pipes/airport-filter.pipe';

@NgModule({
  declarations: [
    PersonalInfoFormComponent,
    ContactFormComponent,
    CountryCodeFilterPipe,
    AirportFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    PersonalInfoFormComponent,
    MatSlideToggleModule,
    CountryCodeFilterPipe,
    ContactFormComponent,
    AirportFilterPipe,
  ],
  providers: [],
})
export class SharedModule {}
