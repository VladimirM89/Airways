import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from '../../models/flight-item';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent {
  public constructor(private bookingService: BookingService) {
    this.getBookingsArray();
  }

  private getBookingsArray() {
    const booking = {
      bookingInfo: this.bookingService.getCurrentBookingInfo(),
      flight: this.bookingService.flights,
      passengers: this.bookingService.passengersInfo,
    };
    console.log(booking);
  }

  public get bookings(): FlightItem[] {
    return this.bookingService.flights;
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }
}
