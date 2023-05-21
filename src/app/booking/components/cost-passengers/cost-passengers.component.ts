/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-return-assign */
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-cost-passengers',
  templateUrl: './cost-passengers.component.html',
  styleUrls: ['./cost-passengers.component.scss'],
})
export class CostPassengersComponent {
  public bookingInfo$ = this.bookingService.getBookingInfo();

  public constructor(private bookingService: BookingService) {}

  public get selectedFlights(): FlightItem[] {
    return this.bookingService.flights;
  }

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
