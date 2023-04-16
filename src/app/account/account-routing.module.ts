import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

const routes: Routes = [
  { path: '', component: AccountPageComponent },
  { path: 'summary', component: SummaryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
