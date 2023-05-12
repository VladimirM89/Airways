import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
import { Airports } from 'src/app/shared/constants/airports';
import { Airport, AirportCodes } from 'src/app/shared/models/airport';
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

  public airports: Airport[] = Airports;

  public ngOnInit(): void {
    this.form = new FormGroup({
      departure: new FormControl<string>(
        this.getfullAirportName(
          this.bookingInfo?.departureAirport as AirportCodes
        )
      ),
      destination: new FormControl<string>(
        this.getfullAirportName(
          this.bookingInfo?.destinationAirport as AirportCodes
        )
      ),
      range: new FormGroup({
        departureDate: new FormControl<Date | null>(
          new Date(this.bookingInfo?.departureDate || '')
        ),
        destinationDate: new FormControl<Date | null>(
          new Date(this.bookingInfo?.returnDate || '')
        ),
      }),
    });
  }

  // TO DO: instead of this getfullAirportName function use directive which will add an airport name after city
  private getfullAirportName(airport: AirportCodes): string {
    const airportFound = this.airports.find(
      item => item.airportCode === airport
    );

    if (airportFound) {
      return `${airportFound.city} (${airport})`;
    }
    return '';
  }

  public get destinationCity(): string {
    return this.form.get('destination')?.value;
  }

  public get departureCity(): string {
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
}
