import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
import { Airports } from 'src/app/shared/constants/airports';
import { Airport } from 'src/app/shared/models/airport';
import { BookingInfo } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { dateToString } from 'src/app/shared/utils';
import { Subscription } from 'rxjs';
import { PassengerCounter } from '../../models/passenger-counter';

@Component({
  selector: 'app-booking-settings-panel',
  templateUrl: './booking-settings-panel.component.html',
  styleUrls: ['./booking-settings-panel.component.scss'],
})
export class BookingSettingsPanelComponent implements OnInit, OnDestroy {
  public constructor(private bookingService: BookingService) {}

  public form!: FormGroup;

  public editMode = false;

  public airports: Airport[] = Airports;

  public passengersArr: Array<PassengerCounter> = [];

  public isSelectOpened = false;

  private sub!: Subscription;

  public bookingInfo: Nullable<BookingInfo> = null;

  public ngOnInit(): void {
    this.sub = this.bookingService.getBookingInfo().subscribe(info => {
      this.bookingInfo = info;
    });

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
      passengers: new FormGroup({
        adult: new FormControl<number>(this.bookingInfo?.passengers.adult || 0),
        children: new FormControl<number>(
          this.bookingInfo?.passengers.child || 0
        ),
        infant: new FormControl<number>(
          this.bookingInfo?.passengers.infant || 0
        ),
      }),
    });

    this.passengersArr.push(
      {
        category: 'Adults',
        description: '14+ years',
        controlName: 'adult',
        control: this.passengers.controls['adult'],
      },
      {
        category: 'Children',
        description: '2-14 years',
        controlName: 'children',
        control: this.passengers.controls['children'],
      },
      {
        category: 'Infants',
        description: '0-1 year',
        controlName: 'infant',
        control: this.passengers.controls['infant'],
      }
    );
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
    this.editMode = false;
    const isRoungTrip =
      this.bookingService.getCurrentBookingInfo()?.roundTrip || false;

    const newSearchInfo: BookingInfo = {
      roundTrip: isRoungTrip,
      departureAirport: this.departure,
      destinationAirport: this.destination,
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

  public setToEditMode(): void {
    this.editMode = true;
  }

  public decrement(control: AbstractControl): void {
    control.setValue(control.value - 1);
  }

  public increment(control: AbstractControl): void {
    control.setValue(control.value + 1);
  }

  public isDecrementDisabled(control: AbstractControl): boolean {
    return control.value <= 0;
  }

  public isIncrementDisabled(control: AbstractControl): boolean {
    return control.value >= 9;
  }

  public toggleSelect(): void {
    this.isSelectOpened = !this.isSelectOpened;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
