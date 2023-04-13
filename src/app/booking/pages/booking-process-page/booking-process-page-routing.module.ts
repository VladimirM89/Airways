import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingProcessPageComponent } from './booking-process-page.component';

const routes: Routes = [{ path: '', component: BookingProcessPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingProcessPageRoutingModule {}
