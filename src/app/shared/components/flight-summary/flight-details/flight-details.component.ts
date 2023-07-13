/* eslint-disable no-return-assign */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Passenger } from 'src/app/shared/models/booking';
import { getFullUTC } from 'src/app/shared/utils';
import { UserBooking } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectAllBookings } from 'src/app/redux/selectors/user.selectors';
import { tap } from 'rxjs/operators';
import { Nullable } from 'src/app/shared/models/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit, OnDestroy {
  @Input() public flight!: FlightItem;

  @Input() public passengers!: Passenger[];

  public getFullUTC = getFullUTC;

  public existingBooking: Nullable<UserBooking> = null;

  private bookingSub!: Subscription;

  public ngOnInit(): void {
    const booking = localStorage.getItem('details');
    if (booking) {
      const userBooking: UserBooking = JSON.parse(booking);
      this.bookingSub = this.store
        .select(selectAllBookings)
        .pipe(
          tap(
            bookings =>
              (this.existingBooking =
                bookings.find(item => item.id === userBooking.id) || null)
          )
        )
        .subscribe();
    }
  }

  public constructor(private store: Store) {}

  public luggageCount(value: string): number {
    return Number(value);
  }

  public get departureAirport(): string {
    return this.flight.departureAirport;
  }

  public get destinationAirport(): string {
    return this.flight.destinationAirport;
  }

  public get departureDate(): string {
    return this.flight.departureDate;
  }

  public get flightNumber(): string {
    return this.flight.flightNumber;
  }

  public get departureTime(): string {
    return this.flight.departureDateTime;
  }

  public get destinationTime(): string {
    return this.flight.destinationDateTime;
  }

  public trackByFn(index: number, item: Passenger): string {
    return item.dateOfBirth;
  }

  public ngOnDestroy(): void {
    if (this.existingBooking) {
      this.bookingSub.unsubscribe();
    }
  }
}
