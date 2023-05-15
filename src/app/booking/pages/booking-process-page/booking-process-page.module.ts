import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingProcessPageRoutingModule } from './booking-process-page-routing.module';
import { BookingProcessPageComponent } from './booking-process-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { BookingContactComponent } from '../../components/booking-contact/booking-contact.component';
import { PassengerItemComponent } from '../../components/passengers-list/passenger-item/passenger-item.component';
import { PassengersListComponent } from '../../components/passengers-list/passengers-list.component';

@NgModule({
  declarations: [
    BookingProcessPageComponent,
    PassengersListComponent,
    PassengerItemComponent,
    BookingContactComponent,
  ],
  exports: [BookingProcessPageComponent],
  imports: [CommonModule, BookingProcessPageRoutingModule, SharedModule],
})
export class BookingProcessPageModule {}
