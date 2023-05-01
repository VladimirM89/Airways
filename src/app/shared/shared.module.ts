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
import { PassengersInfoFormComponent } from './components/passengers-info-form/passengers-info-form.component';
import { BookingTableComponent } from './components/booking-table/booking-table.component';
import { BookingItemComponent } from './components/booking-table/booking-item/booking-item.component';
import { PassengersInfoService } from './services/passengers-info.service';
import { BookingContactComponent } from './components/booking-table/booking-contact/booking-contact.component';

@NgModule({
  declarations: [
    PassengersInfoFormComponent,
    BookingTableComponent,
    BookingItemComponent,
    BookingContactComponent,
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
    PassengersInfoFormComponent,
    BookingTableComponent,
    BookingContactComponent,
    MatSlideToggleModule,
  ],
  providers: [PassengersInfoService, BookingContactComponent],
})
export class SharedModule {}
