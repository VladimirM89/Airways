/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { Passenger } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-summary-flight',
  templateUrl: './summary-flight.component.html',
  styleUrls: ['./summary-flight.component.scss'],
})
export class SummaryFlightComponent {
  @Input() public flight!: FlightItem;

  public constructor(private bookingService: BookingService) {
    this.passengers;
  }

  public get passengers(): Passenger[] {
    const allPassengers = [];
    if (this.bookingService.passengersInfo) {
      allPassengers.push(this.bookingService.passengersInfo?.adult);
      allPassengers.push(this.bookingService.passengersInfo?.child);
      allPassengers.push(this.bookingService.passengersInfo?.infant);
    }
    return allPassengers.flat();
  }

  public luggageCount(value: string): number {
    return Number(value);
  }

  public get departureCity(): string {
    return this.flight.departureCity;
  }

  public get destinationCity(): string {
    return this.flight.destinationCity;
  }

  public get departureDate(): string {
    return this.flight.departureDate;
  }

  public get flightNumber(): string {
    return this.flight.flightNumber;
  }

  public get departureTime(): string {
    return this.flight.departureDateTime;
  }

  public get destinationTime(): string {
    return this.flight.destinationDateTime;
  }

  public trackByFn(index: number, item: Passenger): string {
    return item.dateOfBirth;
  }
}
