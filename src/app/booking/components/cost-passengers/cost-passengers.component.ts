/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-return-assign */
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-cost-passengers',
  templateUrl: './cost-passengers.component.html',
  styleUrls: ['./cost-passengers.component.scss'],
})
export class CostPassengersComponent {
  public bookingInfo$ = this.bookingService.getBookingInfo();

  public constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService
  ) {}

  public get selectedFlights(): FlightItem[] {
    return this.bookingService.flights;
  }

  public get fare(): number {
    return this.paymentService.fare;
  }

  public get tax(): number {
    return this.paymentService.tax;
  }

  public get summary(): number {
    return this.paymentService.summary;
  }
}
