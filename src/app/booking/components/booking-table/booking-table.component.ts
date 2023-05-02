import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent {
  // TODO: items - get number of passengers from passengersInfo
  public items = ['adult', 'child', 'infants'];
}
