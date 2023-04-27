import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingProcessPageRoutingModule } from './booking-process-page-routing.module';
import { BookingProcessPageComponent } from './booking-process-page.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [BookingProcessPageComponent],
  exports: [BookingProcessPageComponent],
  imports: [CommonModule, BookingProcessPageRoutingModule, SharedModule],
})
export class BookingProcessPageModule {}
