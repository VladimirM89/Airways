import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { BookingService } from '../core/services/booking.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnDestroy, OnInit {
  public constructor(
    private localStorageService: LocalStorageService,
    private bookingService: BookingService
  ) {}

  public ngOnInit(): void {
    if (!this.bookingService.getCurrentBookingInfo()) {
      this.localStorageService.getBookingFromLocalStorage();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): void {
    this.localStorageService.saveBookingToLocalStorage();
  }

  public ngOnDestroy(): void {
    this.localStorageService.deleteBookingFromLocalStorage();
  }
}
