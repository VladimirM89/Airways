import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSelectionPageRoutingModule } from './flight-selection-page-routing.module';
import { FlightSelectionPageComponent } from './flight-selection-page.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { SearchItemComponent } from '../../components/search-results/search-item/search-item.component';
import { DateSliderComponent } from '../../components/search-results/date-slider/date-slider.component';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    SearchResultsComponent,
    SearchItemComponent,
    DateSliderComponent,
  ],
  imports: [CommonModule, FlightSelectionPageRoutingModule],
})
export class FlightSelectionPageModule {}
