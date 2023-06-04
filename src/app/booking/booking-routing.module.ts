import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { Paths } from '../types/enums';
import { UserGuard } from '../core/guards/user.guard';
import { SelectedFlightsGuard } from '../core/guards/selected-flights.guard';
import { PassengersInfoGuard } from '../core/guards/passengers-info.guard';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        redirectTo: Paths.BOOKING_FLIGHTS,
        pathMatch: 'full',
      },
      {
        path: Paths.BOOKING_PASSENGERS,
        loadChildren: () =>
          import(
            './pages/booking-process-page/booking-process-page.module'
          ).then(m => m.BookingProcessPageModule),
        canActivate: [UserGuard, SelectedFlightsGuard],
      },
      {
        path: Paths.BOOKING_PAYMENT,
        loadChildren: () =>
          import('./pages/summary-page/summary-page.module').then(
            m => m.SummaryPageModule
          ),
        canActivate: [UserGuard, PassengersInfoGuard],
      },
      {
        path: Paths.BOOKING_FLIGHTS,
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
