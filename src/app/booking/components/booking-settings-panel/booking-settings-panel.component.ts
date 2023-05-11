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
      departureDate: new FormControl<string>(
        this.bookingInfo?.departureDate || ''
      ),
      destinationDate: new FormControl<string>(
        this.bookingInfo?.returnDate || ''
      ),
      // passengers: new FormControl<number>(this.bookingService.passengersNumber),
    });
  }

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

  public get destinationDate(): Date {
    return new Date(this.form.get('destinationDate')?.value);
  }

  public get departureDate(): Date {
    return new Date(this.form.get('departureDate')?.value);
  }

  // public get passengers() {
  //   return this.form.get('passengers')?.value;
  // }

  public getPassengersNumber(): number {
    return this.bookingService.passengersNumber;
  }

  // eslint-disable-next-line class-methods-use-this
  public trackByFn(index: number, item: Airport): number {
    return item.id;
  }
}
