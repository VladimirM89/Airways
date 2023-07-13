import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';

@NgModule({
  declarations: [SummaryPageComponent],
  imports: [CommonModule, SummaryPageRoutingModule, SharedModule],
})
export class SummaryPageModule {}
