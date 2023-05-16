import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-summary-passengers',
  templateUrl: './summary-passengers.component.html',
  styleUrls: ['./summary-passengers.component.scss'],
})
export class SummaryPassengersComponent {
  public constructor(private bookingService: BookingService) {}
}
