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
      departure: new FormControl<string>(''),
      destination: new FormControl<string>(''),
      departureDate: new FormControl<string>(''),
      destinationDate: new FormControl<string>(''),
      passengers: new FormControl<string>(''),
    });
  }
}
