/* eslint-disable prettier/prettier */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import {
  FlightFare,
  GetFligthsFareDto,
} from 'src/app/shared/models/api-models';
import { Observable, map } from 'rxjs';
import { dateObjToString } from 'src/app/shared/utils';
import { BookingService } from 'src/app/core/services/booking.service';
import { BookingInfo } from 'src/app/shared/models/booking';
import { DAYS_AFTER_CURRENT, DAYS_BEFORE_CURRENT, SLIDER_LENGTH } from 'src/app/booking/constants/slider-data.constants';
import {
  DateSliderItem,
  DirectionsData,
} from '../../../models/date-slider.models';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
})
export class DateSliderComponent implements OnInit, OnChanges {
  public constructor(
    private apiService: ApiFlightService,
    private bookingService: BookingService
  ) {}

  @Input() public currentDate!: string;

  @Input() public flightDirections!: DirectionsData;

  public sliderData: Observable<DateSliderItem[]> | null = null;

  public ngOnInit(): void {
    this.sliderData = this.createNewSliderItems();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(changes['currentDate']?.currentValue);
    console.log(changes['currentDate']?.previousValue);
  }

  private createNewSliderItems(): Observable<DateSliderItem[]> {
    const fromDate = this.changeDateForDaysNumber(new Date(this.currentDate), DAYS_BEFORE_CURRENT);
    const toDate = this.changeDateForDaysNumber(new Date(this.currentDate), DAYS_AFTER_CURRENT);
    const current = new Date(fromDate);
    const fares = this.getFaresForPeriod(fromDate, toDate).pipe(
      map(items => {
        const arr: DateSliderItem[] = [];
        for (let i = 0; i < SLIDER_LENGTH; i += 1) {
          const fare = items.find(
            item => item.date === dateObjToString(current)
          );
          arr.push({
            date: new Date(current),
            price: fare?.flightFare || null,
          })
          current.setDate(current.getDate() + 1)
        }
        return arr;
      })
    )
    return fares;
  }

  public selectNewDate(date: string): void {
    const currentBookingInfo = this.bookingService.getCurrentBookingInfo();
    if (currentBookingInfo) {
      const isRoundTrip = currentBookingInfo.roundTrip;
      if (
        isRoundTrip &&
        this.flightDirections.from !== currentBookingInfo.departureAirport
      ) {
        const dto: BookingInfo = {
          ...currentBookingInfo,
          returnDate: date,
        };
        this.bookingService.changeReturnDate(dto);
      } else {
        const dto: BookingInfo = {
          ...currentBookingInfo,
          departureDate: date,
        };
        this.bookingService.changeForwardDate(dto);
      }
    }
  }

  public checkIfActiveDate(item: DateSliderItem): boolean {
    return dateObjToString(item.date) === this.currentDate;
  }

  private getFaresForPeriod(
    fromDate: Date,
    toDate: Date
  ): Observable<FlightFare[]> {
    const dto: GetFligthsFareDto = {
      fromDate: dateObjToString(new Date(fromDate)),
      toDate: dateObjToString(new Date(toDate)),
      departureAirport: this.flightDirections.from,
      destinationAirport: this.flightDirections.to,
    };
    return this.apiService.getFlightsFare(dto);
  }

  private changeDateForDaysNumber(date: Date, days: number): Date {
    const newDateInMS = new Date(dateObjToString(date)).setDate(date.getDate() + days);
    return new Date(newDateInMS);
  }

  public trackByFn(index: number, item: DateSliderItem): string {
    return item.date.toISOString();
  }
}
