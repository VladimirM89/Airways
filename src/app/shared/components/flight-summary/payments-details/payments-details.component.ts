import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-payments-details',
  templateUrl: './payments-details.component.html',
  styleUrls: ['./payments-details.component.scss'],
})
export class PaymentsDetailsComponent {
  @Input() public passengers!: PassengersNumber;

  @Input() public flights!: FlightItem[];

  public constructor(private paymentService: PaymentService) {}

  public get fare(): number {
    return this.paymentService.fare(this.flights);
  }

  public get tax(): number {
    return this.paymentService.tax(this.flights);
  }

  public get summary(): number {
    return this.paymentService.summary(this.passengers, this.flights);
  }

  public trackByFn(
    index: number,
    passenger: KeyValue<keyof PassengersNumber, number>
  ): string {
    return passenger.key;
  }
}
