import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';

@NgModule({
  declarations: [SummaryPageComponent],
  imports: [CommonModule, SummaryPageRoutingModule],
})
export class SummaryPageModule {}
