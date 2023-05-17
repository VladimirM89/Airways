/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { Passenger } from 'src/app/shared/models/booking';

@Component({
  selector: 'app-summary-flight',
  templateUrl: './summary-flight.component.html',
  styleUrls: ['./summary-flight.component.scss'],
})
export class SummaryFlightComponent {
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

  public get isRoundTrip(): boolean | null {
    if (this.bookingService.bookingInfo?.roundTrip) {
      return this.bookingService.bookingInfo?.roundTrip;
    }
    return null;
  }

  public get departureCity(): string | null {
    if (this.bookingService.bookingInfo) {
      return this.bookingService.bookingInfo?.departureCity;
    }
    return null;
  }

  public get destinationCity(): string | null {
    if (this.bookingService.bookingInfo) {
      return this.bookingService.bookingInfo?.destinationCity;
    }
    return null;
  }

  public get departureDate(): Date | null {
    if (this.bookingService.bookingInfo) {
      const date = new Date(this.bookingService.bookingInfo?.departureDate);
      return date;
    }
    return null;
  }

  public get returnDate(): Date | null {
    if (this.bookingService.bookingInfo) {
      const date = new Date(this.bookingService.bookingInfo?.returnDate);
      return date;
    }
    return null;
  }

  public trackByFn(index: number, item: Passenger): string {
    return item.dateOfBirth;
  }
}
