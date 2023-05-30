import { Component, Input } from '@angular/core';
import { DateSliderItemDto } from 'src/app/booking/models/date-slider.models';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.scss'],
})
export class DateItemComponent {
  @Input() public dateItemDto!: DateSliderItemDto;
}
