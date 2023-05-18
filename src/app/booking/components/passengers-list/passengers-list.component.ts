import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from 'src/app/core/services/booking.service';
import {
  PassangersInfo,
  Passenger,
  PassengersNumber,
} from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { Subscription } from 'rxjs';
import { PassengersFormsService } from 'src/app/shared/services/passengers-forms.service';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})
export class PassengersListComponent implements OnInit, OnDestroy {
  public items: Array<string> = [];

  public passengersDataArray: Array<Nullable<Passenger>> = [];

  private sub!: Subscription;

  public constructor(
    private bookingService: BookingService,
    private passengersFormsService: PassengersFormsService
  ) {}

  public ngOnInit(): void {
    this.sub = this.bookingService.getBookingInfo().subscribe(bookingInfo => {
      const passengers = bookingInfo?.passengers;
      if (passengers) {
        this.items = [];
        this.passengersDataArray = [];
        this.createPassengersArray(passengers);
        this.passengersFormsService.createInitialPassengersInfo();
        this.passengersFormsService.createInitialPassengersArray();
      }
    });
  }

  public trackByFn(index: number, item: string): string {
    return item;
  }

  public createPassengersArray(passengers: PassengersNumber): void {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const item in passengers) {
      for (let i = 0; i < passengers[item as keyof typeof passengers]; i += 1) {
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

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
