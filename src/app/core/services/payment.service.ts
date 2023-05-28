/* eslint-disable no-return-assign */
import { Injectable } from '@angular/core';
import { BookingInfo } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Nullable } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public fare(flights: FlightItem[]): number {
    let fare = 0;
    flights.forEach(item => (fare += item.flightFare));
    return fare;
  }

  public tax(flights: FlightItem[]): number {
    let tax = 0;
    flights.forEach(item => (tax += item.tax));
    return tax;
  }

  public summary(
    bookingInfo: Nullable<BookingInfo>,
    flights: FlightItem[]
  ): number {
    let summary = 0;
    if (bookingInfo) {
      const passengersNumber =
        bookingInfo.passengers.adult +
        bookingInfo.passengers.child +
        bookingInfo.passengers.infant;
      summary = passengersNumber * (this.fare(flights) + this.tax(flights));
    }
    return summary;
  }
}
