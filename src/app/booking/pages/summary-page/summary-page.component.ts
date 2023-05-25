/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @ngrx/no-store-subscription */
/* eslint-disable no-return-assign */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { addBookingToState } from 'src/app/redux/actions/bookings.action';

import { selectUserDate } from 'src/app/redux/selectors/user.selectors';
import { FlightItem } from 'src/app/shared/models/flight-item';
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

  private userSub!: Subscription;

  private user: Nullable<User> = null;

  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.userSub = this.store
      .select(selectUserDate)
      .subscribe(user => (this.user = user));
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

    if (this.user) {
      console.log('user exist in store: ', !!this.user, this.user);
      this.bookingService.addNewBooking(booking);
      const user = { ...this.user };
      user.bookings = this.bookingService.allUserBookings;
      console.log('update user bookings: ', user);

      this.store.dispatch(
        addBookingToState({
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
    this.userSub.unsubscribe();
  }
}
