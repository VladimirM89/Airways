/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-additional-info',
  templateUrl: './booking-additional-info.component.html',
  styleUrls: ['./booking-additional-info.component.scss'],
})
export class BookingAdditionalInfoComponent {
  public value = 0;

  public initialBaggage = 0;

  public decrementValue(): void {
    const inputValue = this.value - 1;
    this.value = inputValue;
  }

  public incrementValue(): void {
    const inputValue = this.value + 1;
    this.value = inputValue;
  }

  public shouldDisableDecrement(inputValue: number): boolean {
    return inputValue <= this.initialBaggage;
  }

  public shouldDisableIncrement(inputValue: number): boolean {
    return inputValue >= 10;
  }
}
