import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../core/services/booking.service';
import { FullBookingInfo } from '../shared/models/booking';
import { LOCAL_STORAGE_BOOKING_KEY } from '../shared/constants/string-constants';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnDestroy, OnInit {
  public constructor(private bookingService: BookingService) {}

  public ngOnInit(): void {
    this.getBookingFromLocalStorage();
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): void {
    this.saveBookingToLocalStorage();
  }

  // @HostListener('window:load', ['$event'])
  // public onloadHandler(): void {
  //   this.getBookingFromLocalStorage();
  // }

  private saveBookingToLocalStorage(): void {
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

  private getBookingFromLocalStorage(): void {
    const ls = localStorage.getItem(LOCAL_STORAGE_BOOKING_KEY);
    if (ls) {
      const bookingData: FullBookingInfo = JSON.parse(ls);
      this.bookingService.setBookingInfo(bookingData.booking);
      this.bookingService.addForwardFlight(bookingData.selected.forwardFlight);
      this.bookingService.addReturnFlight(bookingData.selected.returnFlight);
      this.bookingService.passengersInfo = bookingData.passengers;
    }
  }

  public ngOnDestroy(): void {
    localStorage.removeItem(LOCAL_STORAGE_BOOKING_KEY);
  }
}
