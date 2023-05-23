/* eslint-disable no-return-assign */
import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public constructor(private bookingService: BookingService) {}

  public get fare(): number {
    let fare = 0;
    this.bookingService.flights.forEach(item => (fare += item.flightFare));
    return fare;
  }

  public get tax(): number {
    let tax = 0;
    this.bookingService.flights.forEach(item => (tax += item.tax));
    return tax;
  }

  public get summary(): number {
    let summary = 0;
    const info = this.bookingService.getCurrentBookingInfo();
    if (this.bookingService && info) {
      const passengersNumber =
        info.passengers.adult + info.passengers.child + info.passengers.infant;
      summary = passengersNumber * (this.fare + this.tax);
    }
    return summary;
  }
}
