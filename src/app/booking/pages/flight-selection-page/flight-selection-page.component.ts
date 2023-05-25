import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';
import { ApiBookingsService } from '../../../core/services/api-bookings.service';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent implements OnInit {
  public constructor(
    private apiBookingService: ApiBookingsService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.apiBookingService
      .deleteBooking({
        id: 1,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiIxMjNAbWFpbC5ydSIsInBob25lIjoiKzIxMzQ1NTU1NiIsImlhdCI6MTY4NTA1MzY5OCwiZXhwIjoxNjg1MDUzNzIyfQ.ObN_DnPf7ulrbwpMgLIV5jOZH1Z1s_HrWR5Lpn0PLUY',
      })
      .subscribe();
  }

  public navigateToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public navigateToMain(): void {
    this.router.navigate([Paths.BASE]);
  }
}
