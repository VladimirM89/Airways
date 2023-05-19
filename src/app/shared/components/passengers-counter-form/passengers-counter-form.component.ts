import { Component, Input, OnInit } from '@angular/core';
import { PassengerCounter } from 'src/app/booking/models/passenger-counter';
import { AbstractControl } from '@angular/forms';
import { PassengersFormGroup } from '../../models/passengers-counter-form';

@Component({
  selector: 'app-passengers-counter-form',
  templateUrl: './passengers-counter-form.component.html',
  styleUrls: ['./passengers-counter-form.component.scss'],
})
export class PassengersCounterFormComponent implements OnInit {
  @Input() public passengersForm!: PassengersFormGroup;

  public passengersArr: Array<PassengerCounter> = [];

  public isSelectOpened = false;

  public ngOnInit(): void {
    this.passengersArr.push(
      {
        category: 'Adults',
        description: '14+ years',
        controlName: 'adult',
        control: this.passengersForm.controls.adult,
      },
      {
        category: 'Children',
        description: '2-14 years',
        controlName: 'children',
        control: this.passengersForm.controls.children,
      },
      {
        category: 'Infants',
        description: '0-1 year',
        controlName: 'infant',
        control: this.passengersForm.controls.infant,
      }
    );
  }

  public get adultsNumber(): number {
    return this.passengersForm.controls.adult.value;
  }

  public get childrenNumber(): number {
    return this.passengersForm.controls.children.value;
  }

  public get infantsNumber(): number {
    return this.passengersForm.controls.infant.value;
  }

  public decrement(control: AbstractControl): void {
    control.setValue(control.value - 1);
  }

  public increment(control: AbstractControl): void {
    control.setValue(control.value + 1);
  }

  public isDecrementDisabled(control: AbstractControl): boolean {
    return control.value <= 0;
  }

  public isIncrementDisabled(control: AbstractControl): boolean {
    return control.value >= 9;
  }

  public toggleSelect(): void {
    this.isSelectOpened = !this.isSelectOpened;
  }
}
