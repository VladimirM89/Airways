import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
import { Airports } from 'src/app/shared/constants/airports';
import { Airport } from 'src/app/shared/models/airport';
import { BookingInfo } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { dateToString } from 'src/app/shared/utils';
import { Subscription } from 'rxjs';
import { FullUrls } from 'src/app/shared/constants/full-urls';
import {
  checkIfFlightDirectionsDuplicate,
  checkIfFlightDirectionValid,
} from 'src/app/shared/validators/flightDirections.validators';
import { checkIfPassengersValid } from 'src/app/shared/validators/passengersCounterForm.validators';
import {
  isDateInPast,
  isFlightsDateRangeValid,
} from 'src/app/shared/validators/date.validators';
import { RouterService } from 'src/app/core/services/router.service';
import {
  DateRangeFormGroup,
  FlightsForm,
  PassengersFormGroup,
} from 'src/app/shared/models/forms-models';

@Component({
  selector: 'app-booking-settings-panel',
  templateUrl: './booking-settings-panel.component.html',
  styleUrls: ['./booking-settings-panel.component.scss'],
})
export class BookingSettingsPanelComponent implements OnInit, OnDestroy {
  public constructor(
    private bookingService: BookingService,
    private routerService: RouterService
  ) {}

  public form!: FormGroup;

  public editMode = false;

  public airports: Airport[] = Airports;

  private sub!: Subscription;

  public bookingInfo: Nullable<BookingInfo> = null;

  public ngOnInit(): void {
    this.sub = this.bookingService.getBookingInfo().subscribe(info => {
      this.bookingInfo = info;
    });

    this.sub.add(
      this.routerService.checkUrl().subscribe(event => {
        if (event.url !== FullUrls.FLIGHTS) {
          this.editMode = false;
        }
      })
    );

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
              this.bookingInfo?.passengers.adult || 1
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

  public toggleFlightDirections(): void {
    const currentDeparture = this.departure.value;
    const currentDestinaton = this.destination.value;
    this.destination.setValue(currentDeparture);
    this.departure.setValue(currentDestinaton);
    this.setNewSearch();
  }

  public getPassengersNumber(): number {
    if (this.bookingInfo) {
      return (
        this.bookingInfo.passengers.adult +
        this.bookingInfo.passengers.child +
        this.bookingInfo.passengers.infant
      );
    }
    return 0;
  }

  public trackByFn(index: number, item: Airport): number {
    return item.id;
  }

  public setNewSearch(): void {
    if (this.form.valid) {
      this.editMode = false;
      const isRoungTrip =
        this.bookingService.getCurrentBookingInfo()?.roundTrip || false;

      const newSearchInfo: BookingInfo = {
        roundTrip: isRoungTrip,
        departureAirport: this.departure.value,
        destinationAirport: this.destination.value,
        departureDate: dateToString(this.departureDate.value),
        returnDate: isRoungTrip ? dateToString(this.destinationDate.value) : '',
        passengers: {
          adult: this.adultsNumber,
          child: this.childrenNumber,
          infant: this.infantsNumber,
        },
      };
      this.bookingService.setBookingInfo(newSearchInfo);
    }
  }

  public setToEditMode(): void {
    this.editMode = true;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public get isEditAvailable(): boolean {
    return window.location.pathname === FullUrls.FLIGHTS;
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
}
