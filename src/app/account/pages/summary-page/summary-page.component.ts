import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger, SelectedFlights } from 'src/app/shared/models/booking';
import { UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {
  public booking!: UserBooking;

  public selectedFlights!: SelectedFlights;

  public ngOnInit(): void {
    const item = localStorage.getItem('details');
    if (item) {
      this.booking = JSON.parse(item);
    }
    this.selectedFlights = {
      forwardFlight: this.booking.flights[0],
      returnFlight: this.booking.flights[1] || null,
    };
  }

  public constructor(private router: Router) {}

  public navToAccount(): void {
    this.router.navigate([Paths.ACCOUNT]);
  }

  public get passengers(): Passenger[] {
    const allPassengers: Array<Passenger[]> = [];

    if (this.booking && this.booking.passengers) {
      allPassengers.push(this.booking.passengers.adult);
      allPassengers.push(this.booking.passengers.child);
      allPassengers.push(this.booking.passengers.infant);
    }
    return allPassengers.flat();
  }

  public ngOnDestroy(): void {
    localStorage.removeItem('details');
  }
}
