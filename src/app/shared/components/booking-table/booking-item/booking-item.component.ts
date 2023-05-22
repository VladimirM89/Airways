import { Component, Input } from '@angular/core';
import { UserBooking } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
})
export class BookingItemComponent {
  @Input() public booking!: UserBooking;

  public get departureAirport(): string {
    return this.booking.bookingInfo.departureAirport;
  }

  public get destinationAirport(): string {
    return this.booking.bookingInfo.destinationAirport;
  }

  public get flightNumber(): string {
    return this.booking.flight[0].flightNumber;
  }

  public get roundTrip(): boolean {
    return this.booking.bookingInfo.roundTrip;
  }
}
