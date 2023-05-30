import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateSliderItemDto } from 'src/app/booking/models/date-slider.models';
import { dateObjToString } from 'src/app/shared/utils';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.scss'],
})
export class DateItemComponent {
  @Input() public dateItemDto!: DateSliderItemDto;

  @Output() public changeDate = new EventEmitter<string>();

  public selectDate(): void {
    this.changeDate.emit(dateObjToString(this.dateItemDto.date));
  }
}
