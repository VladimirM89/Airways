import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { getLocalUTC, getFullUTC } from 'src/app/shared/utils';
import { FlightDirection } from 'src/app/types/enums';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  public constructor(private bookingService: BookingService) {}

  @Input() public flight!: FlightItem;

  @Input() public selected = false;

  @Input() public direction: string = FlightDirection.FORWARD;

  public getFullUTC = getFullUTC;

  public getLocalUTC = getLocalUTC;

  public getFlightDuration(): string {
    const hours = Math.trunc(this.flight.durationMinutes / 60);
    const minutes = this.flight.durationMinutes % 60;
    return `${hours}h ${`0${minutes}`.slice(-2)}m`;
  }

  public selectFlight(): void {
    if (this.direction === FlightDirection.FORWARD) {
      this.bookingService.addForwardFlight(this.flight);
    }
    if (this.direction === FlightDirection.RETURN) {
      this.bookingService.addReturnFlight(this.flight);
    }
  }

  public editFlight(): void {
    if (this.direction === FlightDirection.FORWARD) {
      this.bookingService.deleteForwardFlight();
    }
    if (this.direction === FlightDirection.RETURN) {
      this.bookingService.deleteReturnFlight();
    }
  }
}
