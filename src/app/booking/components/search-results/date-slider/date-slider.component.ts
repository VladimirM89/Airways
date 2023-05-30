import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import { DateSliderItemDto, DirectionsData } from '../../../models/date-slider.models';
import { SearchFlightsDto } from 'src/app/shared/models/api-models';

@Component({
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
})
export class DateSliderComponent implements OnInit {
  public constructor(private apiService: ApiFlightService) {}

  @Input() public currentDate!: string;

  @Input() public flightDirections!: DirectionsData;

  public sliderData: DateSliderItemDto[] = [{date: new Date(), price: 480, available: false, active: false  },{date: new Date(), price: 480, available: false, active: false  }, {date: new Date(), price: 480, available: true, active: true  },{date: new Date(), price: 480, available: true, active: false },{date: new Date(), price: 480, available: true, active: false }, ];

  public ngOnInit(): void {
    this.updateSliderData();
  }

  private updateSliderData(): void {
    const current = new Date(this.currentDate);
    const fromDate = new Date(this.currentDate).setDate(current.getDate() + 2);
    const toDate = new Date(this.currentDate).setDate(current.getDate() - 2);
    const getFlightsDto = {
      from: new Date(fromDate).toJSON().split('T')[0],
      to: new Date(toDate).toJSON().split('T')[0],
    };
  }
}
