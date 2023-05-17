import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public constructor(private bookingService: BookingService) {}

  public get isRoundTrip(): boolean | null {
    if (this.bookingService.bookingInfo?.roundTrip) {
      return this.bookingService.bookingInfo?.roundTrip;
    }
    return null;
  }
}
