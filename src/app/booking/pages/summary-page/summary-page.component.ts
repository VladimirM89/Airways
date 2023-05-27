/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @ngrx/no-store-subscription */
/* eslint-disable no-return-assign */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiBookingsService } from 'src/app/core/services/api-bookings.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { addBookingsToState } from 'src/app/redux/actions/user.action';

import { selectAllBookings } from 'src/app/redux/selectors/user.selectors';
import { FlightItem } from 'src/app/shared/models/api-models';

import { Nullable } from 'src/app/shared/models/types';
import { User, UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  public bookingInfo$ = this.bookingService.getBookingInfo();

  private bookingsSub!: Subscription;

  private bookings: Nullable<UserBooking[]> = null;

  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private store: Store,
    private apiBookingsService: ApiBookingsService
  ) {}

  public ngOnInit(): void {
    this.bookingsSub = this.store
      .select(selectAllBookings)
      .subscribe(bookings => (this.bookings = bookings));
  }

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

  // TODO: update to use effect (first updateUser Api, second add to state)
  public addBookings(): void {
    const booking = this.userBooking();
    if (!booking) return;

    if (this.bookings) {
      this.store.dispatch(
        addBookingsToState({
          booking,
        })
      );
    }
    this.navToCart();
  }

  private userBooking(): Nullable<UserBooking> {
    const correntBookingInfo = this.bookingService.getCurrentBookingInfo();

    if (correntBookingInfo && this.bookingService.passengersInfo) {
      return {
        paid: false,
        bookingInfo: correntBookingInfo,
        flights: this.bookingService.flights,
        passengers: this.bookingService.passengersInfo,
      };
    }

    return null;
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }

  private navToCart(): void {
    this.router.navigate([Paths.CART]);
  }

  public ngOnDestroy(): void {
    this.bookingsSub.unsubscribe();
  }
}
