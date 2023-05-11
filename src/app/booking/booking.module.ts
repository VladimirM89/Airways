import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { BookingSettingsPanelComponent } from './components/booking-settings-panel/booking-settings-panel.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-results/search-item/search-item.component';
import { DateSliderComponent } from './components/search-results/date-slider/date-slider.component';
import { AirportToCityPipe } from './pipes/airport-to-city.pipe';

@NgModule({
  declarations: [
    BookingComponent,
    BookingSettingsPanelComponent,
    SearchResultsComponent,
    SearchItemComponent,
    DateSliderComponent,
    AirportToCityPipe,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
})
export class BookingModule {}
