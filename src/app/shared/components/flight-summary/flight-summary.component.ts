import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { SelectedFlights } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
})
export class FlightSummaryComponent {
  @Input() public selectedFlights!: SelectedFlights;

  public constructor(private bookingService: BookingService) {}

  public get sortedFlights(): Array<FlightItem> {
    if (
      this.selectedFlights.forwardFlight &&
      this.selectedFlights.returnFlight
    ) {
      return [
        this.selectedFlights.forwardFlight,
        this.selectedFlights.returnFlight,
      ];
    }
    if (this.selectedFlights.forwardFlight) {
      return [this.selectedFlights.forwardFlight];
    }
    return [];
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }
}
