import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() public control!: FormControl<number | null>;

  @Input() public min = 0;

  @Input() public max = 9;

  public decrement(): void {
    if (this.control.value !== null) {
      this.control.setValue(this.control.value - 1);
    }
  }

  public increment(): void {
    if (this.control.value !== null) {
      this.control.setValue(this.control.value + 1);
    }
  }

  public isDecrementDisabled(): boolean {
    if (this.control.value !== null) {
      return this.control.value <= this.min;
    }
    return false;
  }

  public isIncrementDisabled(): boolean {
    if (this.control.value !== null) {
      return this.control.value >= this.max;
    }
    return false;
  }
}
