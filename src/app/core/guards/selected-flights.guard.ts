/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import { BookingService } from '../services/booking.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedFlightsGuard implements CanActivate, CanLoad {
  public constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  public canActivate(): boolean | UrlTree {
    if (this.isFlightsSelected()) {
      return true;
    }
    return this.router.createUrlTree([FullUrls.FLIGHTS]);
  }

  public canLoad(): boolean | UrlTree {
    if (this.isFlightsSelected()) {
      return true;
    }
    return this.router.createUrlTree([FullUrls.FLIGHTS]);
  }

  private isFlightsSelected(): boolean {
    const flightsSelected = this.bookingService.getCurrentSelectedFlights();
    const bookingInfo = this.bookingService.getCurrentBookingInfo();
    if (bookingInfo && flightsSelected) {
      return bookingInfo.roundTrip
        ? !!flightsSelected.forwardFlight && !!flightsSelected.returnFlight
        : !!flightsSelected.forwardFlight;
    }
    return false;
  }
}
