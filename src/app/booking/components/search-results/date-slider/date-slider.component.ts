import { Component, Input, OnDestroy, OnChanges } from '@angular/core';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import { GetFligthsFareDto } from 'src/app/shared/models/api-models';
import { Subscription, map } from 'rxjs';
import { dateObjToString } from 'src/app/shared/utils';
import {
  DateSliderItemDto,
  DirectionsData,
} from '../../../models/date-slider.models';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
})
export class DateSliderComponent implements OnChanges, OnDestroy {
  public constructor(private apiService: ApiFlightService) {}

  @Input() public currentDate!: string;

  @Input() public flightDirections!: DirectionsData;

  private sub!: Subscription;

  public sliderData: DateSliderItemDto[] = [];

  public ngOnChanges(): void {
    const dto = this.createFlightFaresDto();
    this.createSliderDateArray(new Date(dto.fromDate));
    this.sub = this.apiService
      .getFlightsFare(dto)
      .pipe(
        map(fares => {
          this.sliderData = this.sliderData.map(date => {
            const fare = fares.find(
              item => item.date === dateObjToString(date.date)
            );
            const fareData: DateSliderItemDto = {
              date: date.date,
              active: date.active,
              price: fare?.flightFare || null,
              available: fare ? date.date > new Date() : false,
            };
            return fareData;
          });
        })
      )
      .subscribe();
  }

  private createSliderDateArray(fromDate: Date): void {
    const active = new Date(this.currentDate);
    this.sliderData = [];
    for (let i = 0; i < 5; i += 1) {
      const from = new Date(fromDate.toISOString());
      this.sliderData.push({
        date: from,
        price: null,
        available: false,
        active: from.toJSON() === active.toJSON(),
      });
      fromDate.setDate(fromDate.getDate() + 1);
    }
  }

  private createFlightFaresDto(): GetFligthsFareDto {
    const current = new Date(this.currentDate);
    const fromDate = new Date(this.currentDate).setDate(current.getDate() - 2);
    const toDate = new Date(this.currentDate).setDate(current.getDate() + 2);
    return {
      fromDate: dateObjToString(new Date(fromDate)),
      toDate: dateObjToString(new Date(toDate)),
      departureAirport: this.flightDirections.from,
      destinationAirport: this.flightDirections.to,
    };
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
