import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { createBooking } from 'src/app/redux/actions/user.action';

import { BookingDto, ContactInfoDto } from 'src/app/shared/models/api-models';
import { Passenger, SelectedFlights } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';
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
    private store: Store
  ) {}

  private sub!: Subscription;

  private selectedFlights!: SelectedFlights;

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

  public get sortedFlights(): Array<FlightItem> {
    if (
      this.selectedFlights.forwardFlight &&
      this.selectedFlights.returnFlight
    ) {
      return [
        this.selectedFlights.forwardFlight,
        this.selectedFlights.returnFlight,
      ];
    }
    if (this.selectedFlights.forwardFlight) {
      return [this.selectedFlights.forwardFlight];
    }
    return [];
  }

  public navToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
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
    const currentBookingInfo = this.bookingService.getCurrentBookingInfo();

    if (
      currentBookingInfo &&
      this.bookingService.passengersInfo &&
      this.selectedFlights.forwardFlight
    ) {
      const booking: BookingDto = {
        token: localStorage.getItem('token') || '',
        paid: false,
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

      this.navToCart();
    }
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }

  private navToCart(): void {
    this.router.navigate([Paths.CART]);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
