import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSelectionPageRoutingModule } from './flight-selection-page-routing.module';
import { FlightSelectionPageComponent } from './flight-selection-page.component';

@NgModule({
  declarations: [FlightSelectionPageComponent],
  imports: [CommonModule, FlightSelectionPageRoutingModule],
})
export class FlightSelectionPageModule {}
