import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
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

  public get isRoundTrip(): boolean | null {
    if (this.bookingService.bookingInfo?.roundTrip) {
      return this.bookingService.bookingInfo?.roundTrip;
    }
    return null;
  }

  public navToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }
}
