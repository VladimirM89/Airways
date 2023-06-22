/* eslint-disable no-return-assign */
import { Injectable } from '@angular/core';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

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

  public summary(passengers: PassengersNumber, flights: FlightItem[]): number {
    const passengersNumber =
      passengers.adult + passengers.child + passengers.infant;
    return passengersNumber * (this.fare(flights) + this.tax(flights));
  }
}
