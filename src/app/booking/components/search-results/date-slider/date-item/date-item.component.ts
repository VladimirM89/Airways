import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateSliderItem } from 'src/app/booking/models/date-slider.models';
import { dateObjToString } from 'src/app/shared/utils';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.scss'],
})
export class DateItemComponent {
  @Input() public dateItemDto!: DateSliderItem;

  @Input() public isActive = false;

  @Output() public changeDate = new EventEmitter<string>();

  public selectDate(): void {
    this.changeDate.emit(dateObjToString(this.dateItemDto.date));
  }

  public isDateInPast(): boolean {
    const currentDate = new Date().setHours(0, 0, 0);
    return this.dateItemDto.date <= new Date(currentDate);
  }
}
