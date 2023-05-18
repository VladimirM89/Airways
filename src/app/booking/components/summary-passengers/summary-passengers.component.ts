import { Component, Input } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Component({
  selector: 'app-summary-passengers',
  templateUrl: './summary-passengers.component.html',
  styleUrls: ['./summary-passengers.component.scss'],
})
export class SummaryPassengersComponent {
  @Input() public flights!: FlightItem[];
}
