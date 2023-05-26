import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-flight-selection-page',
  templateUrl: './flight-selection-page.component.html',
  styleUrls: ['./flight-selection-page.component.scss'],
})
export class FlightSelectionPageComponent {
  public constructor(private router: Router) {}

  public navigateToPassengers(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }

  public navigateToMain(): void {
    this.router.navigate([Paths.BASE]);
  }
}
