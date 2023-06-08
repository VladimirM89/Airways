import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Passenger } from 'src/app/shared/models/booking';
import { getFullUTC } from 'src/app/shared/utils';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  @Input() public flight!: FlightItem;

  public getFullUTC = getFullUTC;

  public constructor(private bookingService: BookingService) {}

  public get passengers(): Passenger[] {
    const allPassengers: Array<Passenger[]> = [];
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

  public get departureAirport(): string {
    return this.flight.departureAirport;
  }

  public get destinationAirport(): string {
    return this.flight.destinationAirport;
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
