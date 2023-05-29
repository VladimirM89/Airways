import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
})
export class DateSliderComponent {
  public constructor(private bookingService: BookingService) {}
}
