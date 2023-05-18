import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { Passenger } from 'src/app/shared/models/booking';

@Component({
  selector: 'app-summary-flight',
  templateUrl: './summary-flight.component.html',
  styleUrls: ['./summary-flight.component.scss'],
})
export class SummaryFlightComponent {
  public constructor(private bookingService: BookingService) {}

  public bookingInfo$ = this.bookingService.getBookingInfo();

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

  public trackByFn(index: number, item: Passenger): string {
    return item.dateOfBirth;
  }
}
