import { Component, Input } from '@angular/core';
import { DateRangeFormGroup } from '../../models/forms-models';

@Component({
  selector: 'app-date-picker-single',
  templateUrl: './date-picker-single.component.html',
  styleUrls: ['./date-picker-single.component.scss'],
})
export class DatePickerSingleComponent {
  @Input() public datesForm!: DateRangeFormGroup;
}
