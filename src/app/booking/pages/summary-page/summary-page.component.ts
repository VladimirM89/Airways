import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
import { createBooking, editBooking } from 'src/app/redux/actions/user.action';

import { BookingDto, ContactInfoDto } from 'src/app/shared/models/api-models';
import { Passenger, SelectedFlights } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Nullable } from 'src/app/shared/models/types';
import { UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private store: Store,
    private selectedBookingService: SelectedBookingService
  ) {}

  private sub!: Subscription;

  public selectedFlights!: SelectedFlights;

  private isPayNowMode = false;

  public isPopupVisible = false;

  public ngOnInit(): void {
    this.sub = this.bookingService
      .getSelectedFlights()
      .pipe(
        map(flights => {
          this.selectedFlights = flights;
        })
      )
      .subscribe();
  }

  public navToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public createPassengersDto(): Passenger[] {
    const passengers = this.bookingService.passengersInfo;
    const arr: Passenger[] = [];
    if (passengers) {
      passengers.adult.forEach(adult =>
        arr.push({ ...adult, category: 'adult' })
      );
      passengers.child.forEach(child =>
        arr.push({ ...child, category: 'child' })
      );
      passengers.infant.forEach(infant =>
        arr.push({ ...infant, category: 'infant' })
      );
    }
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
    const currentBookingInfo = this.bookingService.getCurrentBookingInfo();
    if (
      currentBookingInfo &&
      this.bookingService.passengersInfo &&
      this.selectedFlights.forwardFlight
    ) {
      const booking: BookingDto = {
        token: localStorage.getItem('token') || '',
        paid: !!this.isPayNowMode,
        forwardFlightId: this.selectedFlights.forwardFlight.id,
        returnFlightId: this.selectedFlights.returnFlight?.id || null,
        passengers: this.createPassengersDto(),
        contactInfo: this.createContactsDto(),
      };

      this.store.dispatch(
        createBooking({
          booking,
        })
      );
      this.bookingService.clearInfo();
    }
  }

  public handleAddToCart(): void {
    this.createUserBooking();
    this.navToCart();
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
    const { forwardFlight } = this.bookingService.getCurrentSelectedFlights();
    const { returnFlight } = this.bookingService.getCurrentSelectedFlights();
    let flights: FlightItem[] = [];
    if (forwardFlight) {
      flights = [forwardFlight];
      if (returnFlight) {
        flights.push(returnFlight);
      }
    }

    if (bookingInfo && this.selectedBookingService.editBookingId) {
      booking = {
        id: this.selectedBookingService.editBookingId,
        paid: false,
        bookingInfo,
        flights,
        passengers: this.bookingService.passengersInfo,
      };
    }
    if (booking) {
      this.store.dispatch(editBooking({ booking }));
    }
    this.selectedBookingService.editBookingId = null;
    this.bookingService.clearInfo();
    this.navToCart();
  }

  public buyNowBooking(): void {
    this.togglePopup();
  }

  public togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  public handleProceedPayment(): void {
    this.isPayNowMode = true;
    this.createUserBooking();
    this.togglePopup();
    this.router.navigate([Paths.ACCOUNT]);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
