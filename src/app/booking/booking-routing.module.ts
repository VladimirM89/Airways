/* eslint-disable import/extensions */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'prefix',
      },
      {
        path: 'passengers',
        loadChildren: () =>
          import(
            './pages/booking-process-page/booking-process-page.module'
          ).then(m => m.BookingProcessPageModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./pages/summary-page/summary-page.module').then(
            m => m.SummaryPageModule
          ),
      },
      {
        path: 'flights',
        loadChildren: () =>
          import(
            './pages/flight-selection-page/flight-selection-page.module'
          ).then(m => m.FlightSelectionPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
