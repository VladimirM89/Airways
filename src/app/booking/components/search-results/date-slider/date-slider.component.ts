/* eslint-disable prettier/prettier */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import {
  FlightFare,
  GetFligthsFareDto,
} from 'src/app/shared/models/api-models';
import { BehaviorSubject, Observable, Subscription, map, take } from 'rxjs';
import { dateObjToString } from 'src/app/shared/utils';
import { BookingService } from 'src/app/core/services/booking.service';
import { BookingInfo } from 'src/app/shared/models/booking';
import { DAYS_AFTER_CURRENT, DAYS_BEFORE_CURRENT, SLIDER_LENGTH } from 'src/app/booking/constants/slider-data.constants';
import { DateSliderItem, DirectionsData } from '../../../models/date-slider.models';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
})
export class DateSliderComponent implements OnInit, OnChanges, OnDestroy {
  public constructor(
    private apiService: ApiFlightService,
    private bookingService: BookingService
  ) {}

  @Input() public currentDate!: string;

  @Input() public flightDirections!: DirectionsData;

  public sliderItemsSubject$ = new BehaviorSubject<DateSliderItem[]>([]);

  public sliderData: DateSliderItem[] = [];

  private sub!: Subscription;

  public ngOnInit(): void {
    this.sub = this.sliderItemsSubject$.subscribe(items => {
      this.sliderData = items;
    })
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    const prevDirection = changes['flightDirections']?.previousValue;
    const currentDirection = changes['flightDirections']?.currentValue;

    if (this.sliderData) {
      if (currentDirection && prevDirection) {
        if (currentDirection.from !== prevDirection.from || currentDirection.to !== prevDirection.to) {
           this.createNewSliderItems();
          return;
        } 
      }
      const isDateInSlider = this.sliderData.find((item, index, obj) => dateObjToString(item.date) === this.currentDate && index !== 0 && index !== obj.length - 1)
      if (!isDateInSlider) {
         this.createNewSliderItems();
       }
    }   
  }
  
  private createNewSliderItems(): void {
    const fromDate = this.changeDateForDaysNumber(new Date(this.currentDate), DAYS_BEFORE_CURRENT);
    const toDate = this.changeDateForDaysNumber(new Date(this.currentDate), DAYS_AFTER_CURRENT);
    const current = new Date(fromDate);
    this.getFaresForPeriod(fromDate, toDate).pipe(
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
        this.sliderItemsSubject$.next(arr);
      }),
      take(1),
    ).subscribe();
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

  public showNext(): void {
      const lastDate = this.sliderData[this.sliderData.length - 1].date;
      const newDateMs = new Date(lastDate).setDate(lastDate.getDate() + 1);
      if (this.sliderData) {
      const newArr = this.sliderData.slice(1);
       this.getFaresForPeriod(new Date(newDateMs), new Date(newDateMs))
          .pipe(
            map(items => {
              const [fare, ] = items;
              newArr.push({
                  date: new Date(newDateMs),
                  price: fare?.flightFare || null,
              })
              this.sliderItemsSubject$.next(newArr);
            }),
            take(1),
          ).subscribe()
    }
  }

  public showPrev(): void {
    const firstDate = this.sliderData[0].date;
    const newDateMs = new Date(firstDate).setDate(firstDate.getDate() - 1);
      if (this.sliderData) {
      const newArr = this.sliderData.slice(0, -1);
       this.getFaresForPeriod(new Date(newDateMs), new Date(newDateMs))
          .pipe(
            map(items => {
              const [fare, ] = items;
              newArr.unshift({
                date: new Date(newDateMs),
                price: fare?.flightFare || null,
              })
              this.sliderItemsSubject$.next(newArr);
            }),
            take(1),
          ).subscribe()
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

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
