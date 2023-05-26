import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { FlightItem } from 'src/app/shared/models/api-models';
import { PassengersNumber } from 'src/app/shared/models/booking';

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

  public trackByFn(
    index: number,
    passenger: KeyValue<keyof PassengersNumber, number>
  ): string {
    return passenger.key;
  }
}
