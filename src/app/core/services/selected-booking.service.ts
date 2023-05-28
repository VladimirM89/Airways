import { Injectable } from '@angular/core';
import { UserBooking } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedBookingService {
  private bookingId: number | null = null;

  private selectedBookings: Array<UserBooking> = [];

  public get editBookingId(): number | null {
    return this.bookingId;
  }

  public set editBookingId(value: number | null) {
    this.bookingId = value;
  }

  public addBooking(booking: UserBooking): void {
    this.selectedBookings.push(booking);
  }

  public deleteBooking(booking: UserBooking): void {
    const array = this.selectedBookings.filter(
      selectedBooking => selectedBooking.id !== booking.id
    );
    this.selectedBookings = array;
  }

  public clearBookings(): void {
    this.selectedBookings.length = 0;
  }
}
