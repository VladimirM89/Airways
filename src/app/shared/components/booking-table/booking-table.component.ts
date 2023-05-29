/* eslint-disable no-return-assign */
import { Component } from '@angular/core';
import { Paths } from 'src/app/types/enums';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectUnpaidBookings } from 'src/app/redux/selectors/user.selectors';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
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
    private router: Router,
    private paymentService: PaymentService,
    private store: Store,
    private selectedBookingService: SelectedBookingService
  ) {}

  public get isAllChecked(): boolean {
    return this.selectedBookingService.getCurrentAllSelectedValue();
  }

  public get unpaidUserBookings$(): Observable<UserBooking[]> {
    return this.store.select(selectUnpaidBookings);
  }

  public navToMain(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public summary(bookings: UserBooking[]): number {
    let sum = 0;
    bookings.forEach(
      item =>
        (sum += this.paymentService.summary(item.bookingInfo, item.flights))
    );
    return sum;
  }

  public get selectedCount(): number {
    return this.selectedBookingService.bookings.length;
  }

  public isAllBookingsSelected(bookings: UserBooking[]): void {
    this.selectedBookingService.changeAllSelectedValue();
    const isAllChecked =
      this.selectedBookingService.getCurrentAllSelectedValue();
    if (isAllChecked) {
      bookings.forEach(booking =>
        this.selectedBookingService.addBooking(isAllChecked, booking)
      );
    } else {
      this.selectedBookingService.clearBookings();
    }
  }
}
