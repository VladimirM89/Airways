import { Component, Input } from '@angular/core';
import {
  Passenger,
  PassengersNumber,
  SelectedFlights,
} from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
})
export class FlightSummaryComponent {
  @Input() public selectedFlights!: SelectedFlights;

  @Input() public passengers!: Passenger[];

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

  public get passengersNumber(): PassengersNumber {
    const adult = this.passengers.filter(item => item.category === 'adult');
    const child = this.passengers.filter(item => item.category === 'child');
    const infant = this.passengers.filter(item => item.category === 'infant');
    return {
      adult: adult.length || 0,
      child: child.length || 0,
      infant: infant.length || 0,
    };
  }

  public trackByFn(index: number, item: FlightItem): number {
    return item.id;
  }
}
