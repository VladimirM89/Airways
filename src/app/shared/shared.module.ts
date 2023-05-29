import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { PersonalInfoFormComponent } from './components/passengers-info-form/personal-info-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CountryCodeFilterPipe } from './pipes/country-code-filter.pipe';
import { AirportFilterPipe } from './pipes/airport-filter.pipe';
import { AirportToCityPipe } from './pipes/airport-to-city.pipe';
import { PassengersCounterFormComponent } from './components/passengers-counter-form/passengers-counter-form.component';
import { DatePickerSingleComponent } from './components/date-picker-single/date-picker-single.component';
import { DatePickerRangeComponent } from './components/date-picker-range/date-picker-range.component';
import { BookingItemComponent } from './components/booking-table/booking-item/booking-item.component';
import { BookingTableComponent } from './components/booking-table/booking-table.component';
import { NgLetDirective } from './directives/ng-let.directive';

@NgModule({
  declarations: [
    PersonalInfoFormComponent,
    ContactFormComponent,
    CountryCodeFilterPipe,
    AirportFilterPipe,
    AirportToCityPipe,
    PassengersCounterFormComponent,
    DatePickerSingleComponent,
    DatePickerRangeComponent,
    BookingTableComponent,
    BookingItemComponent,
    NgLetDirective,
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
    MatCardModule,
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
    MatCardModule,
    PersonalInfoFormComponent,
    MatSlideToggleModule,
    CountryCodeFilterPipe,
    ContactFormComponent,
    AirportFilterPipe,
    AirportToCityPipe,
    PassengersCounterFormComponent,
    DatePickerSingleComponent,
    DatePickerRangeComponent,
    BookingTableComponent,
    BookingItemComponent,
    NgLetDirective,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class SharedModule {}
