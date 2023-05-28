import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingService } from 'src/app/core/services/booking.service';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
import { createBooking, editBooking } from 'src/app/redux/actions/user.action';

import {
  BookingDto,
  ContactInfoDto,
  FlightItem,
} from 'src/app/shared/models/api-models';
import { Passenger } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private store: Store,
    private selectedBookingService: SelectedBookingService
  ) {}

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

  private createPassengersDto(): Passenger[] {
    const passengers = this.bookingService.passengersInfo;
    const arr: Passenger[] = [];
    passengers?.adult.forEach(adult =>
      arr.push({ ...adult, category: 'adult' })
    );
    passengers?.child.forEach(adult =>
      arr.push({ ...adult, category: 'child' })
    );
    passengers?.infant.forEach(adult =>
      arr.push({ ...adult, category: 'infant' })
    );
    return arr;
  }

  private createContactsDto(): ContactInfoDto {
    const contacts = this.bookingService.passengersInfo?.contacts;
    return {
      email: contacts?.email || '',
      countryCode: contacts?.mobile.countryCode || '',
      number: contacts?.mobile.number || '',
    };
  }

  public createUserBooking(): void {
    const booking: BookingDto = {
      token: localStorage.getItem('token') || '',
      paid: false,
      forwardFlightId: this.sortedFlights[0].id,
      returnFlightId: this.sortedFlights[1].id || null,
      passengers: this.createPassengersDto(),
      contactInfo: this.createContactsDto(),
    };

    this.store.dispatch(
      createBooking({
        booking,
      })
    );
    this.bookingService.clearInfo();
    this.navToCart();
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }

  private navToCart(): void {
    this.router.navigate([Paths.CART]);
  }

  public get isEditMode(): boolean {
    return !!this.selectedBookingService.editBookingId;
  }

  public editBooking(): void {
    let booking: Nullable<UserBooking> = null;
    const bookingInfo = this.bookingService.getCurrentBookingInfo();
    if (bookingInfo && this.selectedBookingService.editBookingId) {
      booking = {
        id: this.selectedBookingService.editBookingId,
        paid: false,
        bookingInfo,
        flights: this.bookingService.flights,
        passengers: this.bookingService.passengersInfo,
      };
    }
    if (booking) {
      this.store.dispatch(editBooking({ bookings: booking }));
    }
    this.selectedBookingService.editBookingId = null;
    this.navToCart();
  }
}
