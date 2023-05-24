/* eslint-disable no-return-assign */
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { Paths } from 'src/app/types/enums';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { UserBooking } from '../../models/user.model';

interface ChoosenBookings {
  seleted: true;
  userBooking: UserBooking;
}

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent {
  public selectedBookings: Array<ChoosenBookings> = [];

  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  public get unpaidUserBookings(): UserBooking[] {
    console.log('booking table: ', this.bookingService.unpaidUserBookings);
    return this.bookingService.unpaidUserBookings;
  }

  public navToMain(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public get summary(): number {
    let sum = 0;
    const bookings = this.bookingService.unpaidUserBookings;
    bookings.forEach(
      item =>
        (sum += this.paymentService.summary(item.bookingInfo, item.flights))
    );
    return sum;
  }
}
