/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import {
  PassangersInfo,
  Passenger,
  PassengersNumber,
} from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})
export class PassengersListComponent implements OnInit {
  public items: Array<string> = [];

  public passengersDataArray: Array<Nullable<Passenger>> = [];

  public passengers: Nullable<PassengersNumber> =
    this.bookingService.bookingInfo!.passengers;

  public ngOnInit(): void {
    this.passengersArray();
  }

  public constructor(private bookingService: BookingService) {}

  public trackByFn(index: number, item: string): string {
    return item;
  }

  public passengersArray(): void {
    for (const item in this.passengers) {
      for (
        let i = 0;
        i < this.passengers[item as keyof typeof this.passengers];
        i += 1
      ) {
        if (this.bookingService.passengersInfo) {
          const passengerData = this.bookingService.passengersInfo[
            item as keyof PassangersInfo
          ] as Array<Passenger>;
          this.passengersDataArray.push(passengerData[i] || null);
        }

        this.items.push(item);
      }
    }
  }
}
