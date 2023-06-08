import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSelectionPageRoutingModule } from './flight-selection-page-routing.module';
import { FlightSelectionPageComponent } from './flight-selection-page.component';
import { SearchItemComponent } from '../../components/search-results/search-item/search-item.component';
import { DateSliderComponent } from '../../components/search-results/date-slider/date-slider.component';
import { SharedModule } from '../../../shared/shared.module';
import { SeatsColorDirective } from '../../directives/seats.derective';
import { DateItemComponent } from '../../components/search-results/date-slider/date-item/date-item.component';
import { PriceColorDirective } from '../../directives/price.directive';

@NgModule({
  declarations: [
    FlightSelectionPageComponent,
    SearchItemComponent,
    DateSliderComponent,
    SeatsColorDirective,
    DateItemComponent,
    PriceColorDirective,
  ],
  imports: [CommonModule, FlightSelectionPageRoutingModule, SharedModule],
})
export class FlightSelectionPageModule {}
