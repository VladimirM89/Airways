import { Component, Input } from '@angular/core';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-summary-passengers',
  templateUrl: './summary-passengers.component.html',
  styleUrls: ['./summary-passengers.component.scss'],
})
export class SummaryPassengersComponent {
  @Input() public flights!: FlightItem[];
}
