import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
})
export class BookingItemComponent {
  @Input() public booking!: FlightItem;

  public constructor(private bookingService: BookingService) {}

  public get departureCity(): string {
    return this.booking.departureCity;
  }

  public get destinationCity(): string {
    return this.booking.destinationCity;
  }

  public get departureDate(): string {
    return this.booking.departureDate;
  }

  public get flightNumber(): string {
    return this.booking.flightNumber;
  }

  public get departureTime(): string {
    return this.booking.departureDateTime;
  }

  public get destinationTime(): string {
    return this.booking.destinationDateTime;
  }

  public get roundTrip(): boolean {
    const currentInfo = this.bookingService.getCurrentBookingInfo();
    if (currentInfo) {
      return currentInfo.roundTrip;
    }
    return false;
  }
}
