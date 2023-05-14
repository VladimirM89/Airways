/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})
export class PassengersListComponent {
  public items: Array<string> = [];

  public passengers: Nullable<PassengersNumber> = null;

  public constructor(private bookingService: BookingService) {
    this.passengers = this.bookingService.bookingInfo!.passengers;
    this.allPassengers();
  }

  public trackByFn(index: number, item: string): string {
    return item;
  }

  public allPassengers(): void {
    for (const item in this.passengers) {
      for (
        let i = 1;
        i <= this.passengers[item as keyof typeof this.passengers];
        i += 1
      ) {
        this.items.push(item);
      }
    }
  }
}
