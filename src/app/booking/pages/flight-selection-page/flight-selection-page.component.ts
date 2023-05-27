import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingService } from 'src/app/core/services/booking.service';
import {
  selectForwardFligths,
  selectReturnFligths,
} from 'src/app/redux/selectors/flights.selectors';
import { FlightItem } from 'src/app/shared/models/api-models';
import { Paths } from 'src/app/types/enums';
import { Observable } from 'rxjs';
import { Nullable } from 'src/app/shared/models/types';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private bookingService: BookingService,
    private store: Store
  ) {}

  public bookingInfo$ = this.bookingService.getBookingInfo();

  public forwardFlights$: Nullable<Observable<FlightItem[]>> = null;

  public returnFlights$: Nullable<Observable<FlightItem[]>> = null;

  public ngOnInit(): void {
    this.forwardFlights$ = this.store.select(selectForwardFligths);
    this.returnFlights$ = this.store.select(selectReturnFligths);
  }

  public get selectedFlights(): FlightItem[] {
    return this.bookingService.flights;
  }

  public navigateToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public navigateToMain(): void {
    this.router.navigate([Paths.BASE]);
  }
}
