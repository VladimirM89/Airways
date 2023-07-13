import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_BOOKING_KEY } from 'src/app/shared/constants/string-constants';
import { FullBookingInfo } from 'src/app/shared/models/booking';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public constructor(private bookingService: BookingService) {}

  public saveBookingToLocalStorage(): void {
    const booking = this.bookingService.getCurrentBookingInfo();
    const selected = this.bookingService.getCurrentSelectedFlights();
    const passengers = this.bookingService.passengersInfo;
    const bookingInfo = {
      booking,
      selected,
      passengers,
    };
    localStorage.setItem(
      LOCAL_STORAGE_BOOKING_KEY,
      JSON.stringify(bookingInfo)
    );
  }

  public getBookingFromLocalStorage(): void {
    const ls = localStorage.getItem(LOCAL_STORAGE_BOOKING_KEY);
    if (ls) {
      const bookingData: FullBookingInfo = JSON.parse(ls);
      this.bookingService.setBookingInfo(bookingData.booking);
      this.bookingService.addForwardFlight(bookingData.selected.forwardFlight);
      this.bookingService.addReturnFlight(bookingData.selected.returnFlight);
      this.bookingService.passengersInfo = bookingData.passengers;
    }
  }

  public deleteBookingFromLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE_BOOKING_KEY);
  }
}
