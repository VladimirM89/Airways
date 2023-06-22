import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingService } from 'src/app/core/services/booking.service';
import {
  selectForwardFligths,
  selectReturnFligths,
} from 'src/app/redux/selectors/flights.selectors';
import { Paths } from 'src/app/types/enums';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Nullable } from 'src/app/shared/models/types';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { SelectedFlights } from 'src/app/shared/models/booking';
import { selectUserAuthBoolean } from 'src/app/redux/selectors/user.selectors';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit, OnDestroy {
  public constructor(
    private router: Router,
    private bookingService: BookingService,
    private store: Store,
    private toasterService: ToasterService
  ) {}

  public bookingInfo$ = this.bookingService.getBookingInfo();

  public forwardFlights$: Nullable<Observable<FlightItem[]>> = null;

  public returnFlights$: Nullable<Observable<FlightItem[]>> = null;

  private isAuth = false;

  private sub!: Subscription;

  public selectedFlights: Nullable<SelectedFlights> = null;

  public ngOnInit(): void {
    this.sub = this.bookingService
      .getSelectedFlights()
      .pipe(
        map(flights => {
          this.selectedFlights = flights;
        }),
        switchMap(() => this.store.select(selectUserAuthBoolean)),
        map(authorized => {
          this.isAuth = authorized;
        })
      )
      .subscribe();
    this.forwardFlights$ = this.store.select(selectForwardFligths);
    this.returnFlights$ = this.store.select(selectReturnFligths);
  }

  public navigateToPassengers(): void {
    if (!this.isAuth) {
      this.toasterService.showError('Please sign in to proceed');
    }
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public navigateToMain(): void {
    this.router.navigate([Paths.BASE]);
  }

  public isAllFlightsSelected(): boolean {
    const isRoundTrip = this.bookingService.getCurrentBookingInfo()?.roundTrip;
    if (isRoundTrip) {
      return (
        !!this.selectedFlights?.forwardFlight &&
        !!this.selectedFlights?.returnFlight
      );
    }
    if (!isRoundTrip) {
      return !!this.selectedFlights?.forwardFlight;
    }
    return false;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
