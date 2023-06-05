/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import { BookingService } from '../services/booking.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PassengersInfoGuard implements CanActivate, CanLoad {
  public constructor(
    private bookingService: BookingService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  public canActivate(): boolean | UrlTree {
    return this.isPassenegersFilled()
      ? true
      : this.router.createUrlTree([FullUrls.PASSENGERS]);
  }

  public canLoad(): boolean | UrlTree {
    return this.isPassenegersFilled()
      ? true
      : this.router.createUrlTree([FullUrls.PASSENGERS]);
  }

  private isPassenegersFilled(): boolean {
    if (!this.bookingService.passengersInfo) {
      this.localStorageService.getBookingFromLocalStorage();
    }
    const passengers = this.bookingService.passengersInfo;
    return passengers
      ? !!passengers.adult.length && !!passengers.contacts
      : false;
  }
}
