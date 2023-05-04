/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-booking-additional-info',
  templateUrl: './booking-additional-info.component.html',
  styleUrls: ['./booking-additional-info.component.scss'],
})
export class BookingAdditionalInfoComponent {
  public value = 0;

  public baggage = new FormControl<number>(5);

  public get baggageValue(): number {
    return this.baggage.value || 0;
  }

  public decrement(): void {
    // const inputValue = this.value - 1;
    // this.value = inputValue;
    console.log('decrement');
    this.baggage.setValue(this.baggageValue - 1);
  }

  public increment(): void {
    // const inputValue = this.value + 1;
    // this.value = inputValue;
    console.log('increment');
    this.baggage.setValue(this.baggageValue + 1);
  }

  public shouldDisableDecrement(): boolean {
    return this.baggageValue <= 0;
  }

  public shouldDisableIncrement(): boolean {
    return this.baggageValue >= 10;
  }
}
