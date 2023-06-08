import { KeyValue } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss'],
})
export class PaymentsDetailsComponent implements OnInit, OnDestroy {
  public bookingInfo$ = this.bookingService.getBookingInfo();

  private sub!: Subscription;

  private flights: Array<FlightItem> = [];

  public constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService
  ) {}

  public ngOnInit(): void {
    this.sub = this.bookingService
      .getSelectedFlights()
      .pipe(
        map(flightsObject => {
          if (flightsObject.forwardFlight && flightsObject.returnFlight) {
            this.flights = [
              flightsObject.forwardFlight,
              flightsObject.returnFlight,
            ];
          } else if (flightsObject.forwardFlight) {
            this.flights = [flightsObject.forwardFlight];
          } else {
            this.flights = [];
          }
        })
      )
      .subscribe();
  }

  public get fare(): number {
    return this.paymentService.fare(this.flights);
  }

  public get tax(): number {
    return this.paymentService.tax(this.flights);
  }

  public get summary(): number {
    const bookingInfo = this.bookingService.getCurrentBookingInfo();
    return this.paymentService.summary(bookingInfo, this.flights);
  }

  public trackByFn(
    index: number,
    passenger: KeyValue<keyof PassengersNumber, number>
  ): string {
    return passenger.key;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
