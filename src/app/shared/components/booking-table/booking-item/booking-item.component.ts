/* eslint-disable no-return-assign */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
import { deleteBooking } from 'src/app/redux/actions/user.action';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

import { UserBooking } from 'src/app/shared/models/user.model';
import { getFullUTC } from 'src/app/shared/utils';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: [
    '../booking-table.component.scss',
    './booking-item.component.scss',
  ],
})
export class BookingItemComponent implements OnInit {
  @Input() public booking!: UserBooking;

  public isChecked = false;

  public isCartPage = false;

  public getFullUTC = getFullUTC;

  public constructor(
    private paymentService: PaymentService,
    private router: Router,
    private store: Store,
    private bookingService: BookingService,
    private selectedBookingService: SelectedBookingService
  ) {}

  public ngOnInit(): void {
    this.selectedBookingService.isAllBookingSelected
      .pipe(map(value => (this.isChecked = value)))
      .subscribe();

    this.isCartPage = this.router.url === `/${Paths.CART}`;
  }

  public checkBooking(booking: UserBooking): void {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.selectedBookingService.addBooking(this.isChecked, booking);
    } else {
      this.selectedBookingService.deleteBooking(booking);
    }
  }

  public get departureAirport(): string {
    return this.booking.bookingInfo.departureAirport;
  }

  public get destinationAirport(): string {
    return this.booking.bookingInfo.destinationAirport;
  }

  private getFlight(airport: string): FlightItem | null {
    const flight = this.booking.flights.find(
      item => item.departureAirport === airport
    );
    return flight || null;
  }

  public get flightNumber(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight?.flightNumber || '';
  }

  public get returnflightNumber(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight?.flightNumber || '';
  }

  public get roundTrip(): boolean {
    return this.booking.bookingInfo.roundTrip;
  }

  public get departureDate(): string {
    return this.booking.bookingInfo.departureDate;
  }

  public get departureTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight ? flight.departureDateTime : '';
  }

  public get destinationTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight ? flight.destinationDateTime : '';
  }

  public get departureBackDate(): string {
    return this.booking.bookingInfo.returnDate;
  }

  public get departureBackTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight ? flight.departureDateTime : '';
  }

  public get destinationBackTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight ? flight.destinationDateTime : '';
  }

  public get passengers(): PassengersNumber {
    return this.booking.bookingInfo.passengers;
  }

  public get cost(): number {
    return this.paymentService.summary(
      this.booking.bookingInfo.passengers,
      this.booking.flights
    );
  }

  public get isNotPayed(): boolean {
    return !this.booking.paid;
  }

  public deleteBooking(booking: UserBooking): void {
    this.store.dispatch(deleteBooking({ booking }));
  }

  public editBooking(booking: UserBooking): void {
    this.updateBookingService(booking);
    this.selectedBookingService.editBookingId = booking.id;
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  private updateBookingService(booking: UserBooking): void {
    this.bookingService.passengersInfo = booking.passengers;
    this.bookingService.setBookingInfo(booking.bookingInfo);
    const sortedArr = booking.flights.slice();
    sortedArr.sort(
      (a, b) =>
        new Date(a.departureDate).getTime() -
        new Date(b.departureDate).getTime()
    );
    this.bookingService.addForwardFlight(sortedArr[0]);
    this.bookingService.addReturnFlight(sortedArr[1]);
  }

  public navToSummary(booking: UserBooking): void {
    localStorage.setItem('details', JSON.stringify(booking));
    this.router.navigate([FullUrls.SUMMARY]);
  }
}
