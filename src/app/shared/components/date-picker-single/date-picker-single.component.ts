import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker-single',
  templateUrl: './date-picker-single.component.html',
  styleUrls: ['./date-picker-single.component.scss'],
})
export class DatePickerSingleComponent {
  @Input() public departureDate!: FormControl;

  @Input() public appearance: 'fill' | 'outline' = 'fill';
}
