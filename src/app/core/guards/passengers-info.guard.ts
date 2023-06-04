/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import { BookingService } from '../services/booking.service';

@Injectable({
  providedIn: 'root',
})
export class PassengersInfoGuard implements CanActivate, CanLoad {
  public constructor(
    private bookingService: BookingService,
    private router: Router
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
    const passengers = this.bookingService.passengersInfo;
    if (passengers) {
      return !!passengers.adult.length && !!passengers.contacts;
    }
    return false;
  }
}
