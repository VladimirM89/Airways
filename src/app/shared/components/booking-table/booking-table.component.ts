import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { UserBooking } from '../../models/user.model';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent {
  public constructor(private bookingService: BookingService) {}

  public get userBookings(): UserBooking[] {
    console.log('booking table: ', this.bookingService.userBookings);
    return this.bookingService.userBookings;
  }
}
