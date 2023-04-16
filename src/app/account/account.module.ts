import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

@NgModule({
  declarations: [AccountPageComponent, SummaryPageComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
