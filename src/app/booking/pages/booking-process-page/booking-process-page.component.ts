import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent {
  public constructor(private router: Router) {}

  public navToFlights(): void {
    this.router.navigate([Paths.BOOKING]);
  }
}
