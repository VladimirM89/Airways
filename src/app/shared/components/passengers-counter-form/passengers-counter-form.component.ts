import { Component, Input, OnInit } from '@angular/core';
import { PassengerCounter } from 'src/app/booking/models/passenger-counter';
import { PassengersFormGroup } from '../../models/passengers-counter-form';

@Component({
  selector: 'app-passengers-counter-form',
  templateUrl: './passengers-counter-form.component.html',
  styleUrls: ['./passengers-counter-form.component.scss'],
})
export class PassengersCounterFormComponent implements OnInit {
  @Input() form!: PassengersFormGroup;

  public passengersArr: Array<PassengerCounter> = [];

  public ngOnInit(): void {
    this.passengersArr.push(
      {
        category: 'Adults',
        description: '14+ years',
        controlName: 'adult',
        control: this.form.controls.adult,
      },
      {
        category: 'Children',
        description: '2-14 years',
        controlName: 'children',
        control: this.form.controls.children,
      },
      {
        category: 'Infants',
        description: '0-1 year',
        controlName: 'infant',
        control: this.form.controls.infant,
      }
    );
  }
}
