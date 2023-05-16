import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
import { Airports } from 'src/app/shared/constants/airports';
import { Airport } from 'src/app/shared/models/airport';
import { BookingInfo } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';

@Component({
  selector: 'app-booking-settings-panel',
  templateUrl: './booking-settings-panel.component.html',
  styleUrls: ['./booking-settings-panel.component.scss'],
})
export class BookingSettingsPanelComponent implements OnInit {
  public constructor(private bookingService: BookingService) {}

  public form!: FormGroup;

  public editMode = false;

  public airports: Airport[] = Airports;

  public get bookingInfo(): Nullable<BookingInfo> {
    return this.bookingService.bookingInfo;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      departure: new FormControl<string>(
        this.bookingInfo?.departureAirport || ''
      ),
      destination: new FormControl<string>(
        this.bookingInfo?.destinationAirport || ''
      ),
      range: new FormGroup({
        departureDate: new FormControl<Date | null>(
          this.bookingInfo ? new Date(this.bookingInfo.departureDate) : null
        ),
        destinationDate: new FormControl<Date | null>(
          this.bookingInfo ? new Date(this.bookingInfo.returnDate) : null
        ),
      }),
    });
  }

  public get destination(): string {
    return this.form.get('destination')?.value;
  }

  public get departure(): string {
    return this.form.get('departure')?.value;
  }

  public get destinationDate(): FormControl<Date | null> {
    return this.range.get('destinationDate') as FormControl<Date | null>;
  }

  public get departureDate(): FormControl<Date | null> {
    return this.range.get('departureDate') as FormControl<Date | null>;
  }

  public get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }

  public getPassengersNumber(): number {
    return this.bookingService.passengersNumber;
  }

  // eslint-disable-next-line class-methods-use-this
  public trackByFn(index: number, item: Airport): number {
    return item.id;
  }

  public setNewSearch(): void {
    this.editMode = false;
    const newSearchInfo: BookingInfo = {
      roundTrip: this.bookingInfo?.roundTrip || false,
      departureAirport: this.departure,
      destinationAirport: this.destination,
      departureDate: this.dateToString(this.departureDate.value),
      returnDate: this.dateToString(this.destinationDate.value),
      passengers: {
        adults: 0,
        child: 0,
        infants: 0,
      },
    };
    this.bookingService.bookingInfo = newSearchInfo;
  }

  public setToEditMode(): void {
    this.editMode = true;
  }

  // eslint-disable-next-line class-methods-use-this
  private dateToString(date: Date | null): string {
    if (date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    }
    return '';
  }
}
