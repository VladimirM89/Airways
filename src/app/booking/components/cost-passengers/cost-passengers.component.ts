import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PassengersNumber } from 'src/app/shared/models/booking';
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
    return this.paymentService.fare(this.bookingService.flights);
  }

  public get tax(): number {
    return this.paymentService.tax(this.bookingService.flights);
  }

  public get summary(): number {
    const bookingInfo = this.bookingService.getCurrentBookingInfo();
    return this.paymentService.summary(
      bookingInfo,
      this.bookingService.flights
    );
  }

  public trackByFn(
    index: number,
    passenger: KeyValue<keyof PassengersNumber, number>
  ): string {
    return passenger.key;
  }
}
