import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingProcessPageRoutingModule } from './booking-process-page-routing.module';
import { BookingProcessPageComponent } from './booking-process-page.component';

@NgModule({
  declarations: [BookingProcessPageComponent],
  exports: [BookingProcessPageComponent],
  imports: [CommonModule, BookingProcessPageRoutingModule],
})
export class BookingProcessPageModule {}
