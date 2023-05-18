import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  public navToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public get sortedFlights(): FlightItem[] {
    const array = this.bookingService.flights.slice();
    array.sort(
      (a, b) =>
        new Date(a.departureDate).getTime() -
        new Date(b.departureDate).getTime()
    );
    return array;
  }

  public bookingInfo$ = this.bookingService.getBookingInfo();
}
