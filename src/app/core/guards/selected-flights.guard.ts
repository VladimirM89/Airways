import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import { BookingService } from '../services/booking.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedFlightsGuard implements CanActivate, CanLoad {
  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  public canActivate(): boolean | UrlTree {
    return this.isFlightsSelected()
      ? true
      : this.router.createUrlTree([FullUrls.FLIGHTS]);
  }

  public canLoad(): boolean | UrlTree {
    return this.isFlightsSelected()
      ? true
      : this.router.createUrlTree([FullUrls.FLIGHTS]);
  }

  private isFlightsSelected(): boolean {
    if (!this.bookingService.getCurrentBookingInfo()) {
      this.localStorageService.getBookingFromLocalStorage();
    }
    const bookingInfo = this.bookingService.getCurrentBookingInfo();
    const selectedFlights = this.bookingService.getCurrentSelectedFlights();
    if (bookingInfo && selectedFlights) {
      return bookingInfo?.roundTrip
        ? !!selectedFlights.forwardFlight && !!selectedFlights.returnFlight
        : !!selectedFlights.forwardFlight;
    }
    return false;
  }
}
