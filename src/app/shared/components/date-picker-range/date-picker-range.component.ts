import { Component, Input } from '@angular/core';
import { DateRangeFormGroup } from '../../models/forms-models';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent {
  @Input() public datesForm!: DateRangeFormGroup;
}
