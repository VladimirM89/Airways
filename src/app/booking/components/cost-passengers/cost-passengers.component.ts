import { Component, Input } from '@angular/core';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-cost-passengers',
  templateUrl: './cost-passengers.component.html',
  styleUrls: ['./cost-passengers.component.scss'],
})
export class CostPassengersComponent {
  @Input() public flights!: FlightItem[];
}
