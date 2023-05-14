import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
  INITIAL_BAGGAGE,
  MAX_BAGGAGE,
} from 'src/app/shared/constants/string-constants';

@Component({
  selector: 'app-passenger-additional-info',
  templateUrl: './passenger-additional-info.component.html',
  styleUrls: ['./passenger-additional-info.component.scss'],
})
export class PassengerAdditionalInfoComponent implements OnInit {
  public additionalInfoForm!: FormGroup;

  public isBaggageError = false;

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

  public set baggageCount(value: number) {
    this.baggage?.setValue(value);
  }

  public decrement(): void {
    this.baggage?.setValue(this.baggageValue - 1);
  }

  public increment(): void {
    this.baggage?.setValue(this.baggageValue + 1);
  }

  public shouldDisableDecrement(): boolean {
    if (this.baggageValue < MAX_BAGGAGE) {
      this.isBaggageError = false;
    }
    return this.baggageValue <= INITIAL_BAGGAGE;
  }

  public shouldDisableIncrement(): boolean {
    if (this.baggageValue >= MAX_BAGGAGE + 1) {
      this.baggageCount = MAX_BAGGAGE;
      this.isBaggageError = true;
    }
    return this.baggageValue >= MAX_BAGGAGE + 1;
  }
}
