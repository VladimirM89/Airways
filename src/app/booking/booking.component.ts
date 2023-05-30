import { Component, HostListener, OnDestroy } from '@angular/core';
import { BookingService } from '../core/services/booking.service';
import { FullBookingInfo } from '../shared/models/booking';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnDestroy {
  public constructor(private bookingService: BookingService) {}

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): void {
    this.saveBookingToLocalStorage();
  }

  @HostListener('window:load', ['$event'])
  public onloadHandler(): void {
    this.getBookingFromLocalStorage();
  }

  private saveBookingToLocalStorage(): void {
    const booking = this.bookingService.getCurrentBookingInfo();
    const selected = this.bookingService.getCurrentSelectedFlights();
    const passengers = this.bookingService.passengersInfo;
    const bookingInfo = {
      booking,
      selected,
      passengers,
    };
    localStorage.setItem('currentBookingInfo', JSON.stringify(bookingInfo));
  }

  private getBookingFromLocalStorage(): void {
    const ls = localStorage.getItem('currentBookingInfo');
    if (ls) {
      const bookingData: FullBookingInfo = JSON.parse(ls);
      this.bookingService.setBookingInfo(bookingData.booking);
      this.bookingService.addForwardFlight(bookingData.selected.forwardFlight);
      this.bookingService.addReturnFlight(bookingData.selected.returnFlight);
      this.bookingService.passengersInfo = bookingData.passengers;
    }
  }

  public ngOnDestroy(): void {
    localStorage.removeItem('currentBookingInfo');
  }
}
