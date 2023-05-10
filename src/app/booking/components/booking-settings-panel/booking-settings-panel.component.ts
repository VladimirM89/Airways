import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
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

  public get bookingInfo(): Nullable<BookingInfo> {
    return this.bookingService.bookingInfo;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      departure: new FormControl<string>(this.bookingInfo?.departureCity || ''),
      destination: new FormControl<string>(
        this.bookingInfo?.destinationCity || ''
      ),
      departureDate: new FormControl<string>(
        this.bookingInfo?.departureDate || ''
      ),
      destinationDate: new FormControl<string>(
        this.bookingInfo?.returnDate || ''
      ),
      passengers: new FormControl<number>(this.bookingService.passengersNumber),
    });
  }

  public get destinationCity(): string {
    return this.form.get('destination')?.value;
  }

  public get departureCity(): string {
    return this.form.get('departure')?.value;
  }

  public get destinationDate(): Date {
    return new Date(this.form.get('destinationDate')?.value);
  }

  public get departureDate(): Date {
    return new Date(this.form.get('departureDate')?.value);
  }

  public get passengersNumber(): number {
    return this.form.get('passengers')?.value;
  }
}
