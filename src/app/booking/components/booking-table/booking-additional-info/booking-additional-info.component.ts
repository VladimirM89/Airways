import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  INITIAL_BAGGAGE,
  MAX_BAGGAGE,
} from 'src/app/shared/constants/string-constants';

@Component({
  selector: 'app-booking-additional-info',
  templateUrl: './booking-additional-info.component.html',
  styleUrls: ['./booking-additional-info.component.scss'],
})
export class BookingAdditionalInfoComponent implements OnInit {
  public additionalInfoForm!: FormGroup;

  public ngOnInit(): void {
    this.additionalInfoForm = new FormGroup({
      assistance: new FormControl<boolean>(false),
      baggage: new FormControl<number>(INITIAL_BAGGAGE),
    });
  }

  public get assistance(): AbstractControl | null {
    return this.additionalInfoForm.get('assistance');
  }

  public get baggage(): AbstractControl | null {
    return this.additionalInfoForm.get('baggage');
  }

  public get baggageValue(): number {
    return this.baggage?.value || 0;
  }

  public decrement(): void {
    this.baggage?.setValue(this.baggageValue - 1);
  }

  public increment(): void {
    this.baggage?.setValue(this.baggageValue + 1);
  }

  public shouldDisableDecrement(): boolean {
    return this.baggageValue <= INITIAL_BAGGAGE;
  }

  public shouldDisableIncrement(): boolean {
    return this.baggageValue >= MAX_BAGGAGE;
  }
}
