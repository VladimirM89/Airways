import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { Airports } from 'src/app/shared/constants/airports';
import { Airport } from 'src/app/shared/models/airport';
import { BookingInfo } from 'src/app/shared/models/booking';
import {
  DateRangeFormGroup,
  FlightsForm,
  PassengersFormGroup,
} from 'src/app/shared/models/forms-models';
import { Nullable } from 'src/app/shared/models/types';
import { dateToString } from 'src/app/shared/utils';
import {
  isDateInPast,
  isFlightsDateRangeValid,
} from 'src/app/shared/validators/date.validators';
import {
  checkIfFlightDirectionValid,
  checkIfFlightDirectionsDuplicate,
} from 'src/app/shared/validators/flightDirections.validators';
import { checkIfPassengersValid } from 'src/app/shared/validators/passengersCounterForm.validators';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit, OnDestroy {
  public constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  public form!: FormGroup<FlightsForm>;

  public airports: Airport[] = Airports;

  private sub!: Subscription;

  public bookingInfo: Nullable<BookingInfo> = null;

  public ngOnInit(): void {
    this.sub = this.bookingService.getBookingInfo().subscribe(info => {
      this.bookingInfo = info;
    });

    this.form = new FormGroup<FlightsForm>(
      {
        roundTrip: new FormControl<'round' | 'one-way'>(
          this.bookingInfo?.roundTrip ? 'round' : 'one-way'
        ),
        departure: new FormControl<string>(
          this.bookingInfo?.departureAirport || '',
          [Validators.required, checkIfFlightDirectionValid()]
        ),
        destination: new FormControl<string>(
          this.bookingInfo?.destinationAirport || '',
          [Validators.required, checkIfFlightDirectionValid()]
        ),
        range: new FormGroup<DateRangeFormGroup>({
          departureDate: new FormControl<Date | null>(
            this.bookingInfo ? new Date(this.bookingInfo.departureDate) : null,
            [Validators.required, isDateInPast()]
          ),
          destinationDate: new FormControl<Date | null>(
            this.bookingInfo ? new Date(this.bookingInfo.returnDate) : null,
            [isDateInPast()]
          ),
        }),
        passengers: new FormGroup<PassengersFormGroup>(
          {
            adult: new FormControl<number>(
              this.bookingInfo ? this.bookingInfo.passengers.adult : 1
            ),
            children: new FormControl<number>(
              this.bookingInfo?.passengers.child || 0
            ),
            infant: new FormControl<number>(
              this.bookingInfo?.passengers.infant || 0
            ),
          },
          [checkIfPassengersValid()]
        ),
      },
      [checkIfFlightDirectionsDuplicate(), isFlightsDateRangeValid()]
    );
  }

  public trackByFn(index: number, item: Airport): number {
    return item.id;
  }

  public setSearch(): void {
    if (this.form.valid) {
      const newSearchInfo: BookingInfo = {
        roundTrip: this.isRoundTrip,
        departureAirport: this.departure.value,
        destinationAirport: this.destination.value,
        departureDate: dateToString(this.departureDate.value),
        returnDate: this.isRoundTrip
          ? dateToString(this.destinationDate.value)
          : '',
        passengers: {
          adult: this.adultsNumber,
          child: this.childrenNumber,
          infant: this.infantsNumber,
        },
      };
      this.bookingService.setBookingInfo(newSearchInfo);
    }
  }

  public submitForm(): void {
    this.setSearch();
    this.router.navigate([Paths.BOOKING]);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public get destination(): FormControl<string> {
    return this.form.get('destination') as FormControl;
  }

  public get departure(): FormControl<string> {
    return this.form.get('departure') as FormControl;
  }

  public get destinationDate(): FormControl<Nullable<Date>> {
    return this.range.get('destinationDate') as FormControl;
  }

  public get departureDate(): FormControl<Nullable<Date>> {
    return this.range.get('departureDate') as FormControl;
  }

  public get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }

  public get passengers(): FormGroup {
    return this.form.get('passengers') as FormGroup;
  }

  public get adultsNumber(): number {
    return this.passengers.controls['adult'].value;
  }

  public get childrenNumber(): number {
    return this.passengers.controls['children'].value;
  }

  public get infantsNumber(): number {
    return this.passengers.controls['infant'].value;
  }

  public get isRoundTrip(): boolean {
    return this.roundTripRadio.value === 'round';
  }

  public get roundTripRadio(): FormControl {
    return this.form.get('roundTrip') as FormControl;
  }

  public toggleFlightDirections(): void {
    const currentDeparture = this.departure.value;
    const currentDestinaton = this.destination.value;
    this.destination.setValue(currentDeparture);
    this.departure.setValue(currentDestinaton);
    this.setSearch();
  }
}
