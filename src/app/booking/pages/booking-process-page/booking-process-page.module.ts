import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingProcessPageRoutingModule } from './booking-process-page-routing.module';
import { BookingProcessPageComponent } from './booking-process-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { BookingItemComponent } from '../../components/booking-table/booking-item/booking-item.component';
import { BookingContactComponent } from '../../components/booking-table/booking-contact/booking-contact.component';
import { BookingTableComponent } from '../../components/booking-table/booking-table.component';

@NgModule({
  declarations: [
    BookingProcessPageComponent,
    BookingTableComponent,
    BookingItemComponent,
    BookingContactComponent,
  ],
  exports: [BookingProcessPageComponent],
  imports: [CommonModule, BookingProcessPageRoutingModule, SharedModule],
})
export class BookingProcessPageModule {}
