import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';
import { SummaryFlightComponent } from '../../components/summary-flight/summary-flight.component';
import { CostPassengersComponent } from '../../components/summary-passengers/cost-passengers.component';

@NgModule({
  declarations: [
    SummaryPageComponent,
    SummaryFlightComponent,
    CostPassengersComponent,
  ],
  imports: [CommonModule, SummaryPageRoutingModule, SharedModule],
})
export class SummaryPageModule {}
