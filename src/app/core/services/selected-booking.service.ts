import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserBooking } from 'src/app/shared/models/user.model';

interface SelectedBookings {
  isSelected: boolean;
  booking: UserBooking;
}

@Injectable({
  providedIn: 'root',
})
export class SelectedBookingService {
  private bookingId: number | null = null;

  private selectedBookings: Array<SelectedBookings> = [];

  public isAllBookingSelected = new BehaviorSubject<boolean>(false);

  public get editBookingId(): number | null {
    return this.bookingId;
  }

  public set editBookingId(value: number | null) {
    this.bookingId = value;
  }

  public changeAllSelectedValue(): void {
    const isSelected = this.isAllBookingSelected.getValue();
    this.isAllBookingSelected.next(!isSelected);
  }

  public getCurrentAllSelectedValue(): boolean {
    return this.isAllBookingSelected.getValue();
  }

  public addBooking(isSelected: boolean, booking: UserBooking): void {
    const isExist = this.selectedBookings.find(
      selectedBooking => selectedBooking.booking.id === booking.id
    );
    if (!isExist) {
      this.selectedBookings.push({
        isSelected,
        booking,
      });
    }
  }

  public deleteBooking(booking: UserBooking): void {
    const array = this.selectedBookings.filter(
      selectedBooking => selectedBooking.booking.id !== booking.id
    );
    this.selectedBookings = array;
  }

  public clearBookings(): void {
    this.selectedBookings.length = 0;
  }

  public get bookings(): SelectedBookings[] {
    return this.selectedBookings;
  }
}
