import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  INITIAL_BAGGAGE,
  MAX_BAGGAGE,
} from 'src/app/shared/constants/string-constants';

@Component({
  selector: 'app-booking-additional-info',
  templateUrl: './booking-additional-info.component.html',
  styleUrls: ['./booking-additional-info.component.scss'],
})
export class BookingAdditionalInfoComponent {
  public baggage = new FormControl<number>(INITIAL_BAGGAGE);

  public get baggageValue(): number {
    return this.baggage.value || 0;
  }

  public decrement(): void {
    this.baggage.setValue(this.baggageValue - 1);
  }

  public increment(): void {
    this.baggage.setValue(this.baggageValue + 1);
  }

  public shouldDisableDecrement(): boolean {
    return this.baggageValue <= INITIAL_BAGGAGE;
  }

  public shouldDisableIncrement(): boolean {
    return this.baggageValue >= MAX_BAGGAGE;
  }
}
