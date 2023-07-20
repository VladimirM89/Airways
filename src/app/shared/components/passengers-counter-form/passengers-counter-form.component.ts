import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { PassengerCounter } from 'src/app/booking/models/passenger-counter';
import { FormGroup } from '@angular/forms';
import { PassengersFormGroup } from '../../models/forms-models';

@Component({
  selector: 'app-passengers-counter-form',
  templateUrl: './passengers-counter-form.component.html',
  styleUrls: ['./passengers-counter-form.component.scss'],
})
export class PassengersCounterFormComponent implements OnInit {
  @Input() public passengersForm!: FormGroup<PassengersFormGroup>;

  public passengersArr: Array<PassengerCounter> = [];

  public isSelectOpened = false;

  public constructor(private elementRef: ElementRef) {}

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
    return this.passengersForm.controls.adult.value || 0;
  }

  public get childrenNumber(): number {
    return this.passengersForm.controls.children.value || 0;
  }

  public get infantsNumber(): number {
    return this.passengersForm.controls.infant.value || 0;
  }

  public toggleSelect(event: Event): void {
    event.stopPropagation();
    this.isSelectOpened = !this.isSelectOpened;
  }

  public closeSelect(): void {
    this.isSelectOpened = false;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target))
      this.closeSelect();
  }
}
