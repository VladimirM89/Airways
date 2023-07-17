import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() public formControl!: FormControl<number | null>;

  @Input() public min = 0;

  @Input() public max = 9;

  public decrement(): void {
    if (this.formControl.value !== null) {
      this.formControl.setValue(this.formControl.value - 1);
    }
  }

  public increment(): void {
    if (this.formControl.value !== null) {
      this.formControl.setValue(this.formControl.value + 1);
    }
  }

  public isDecrementDisabled(): boolean {
    if (this.formControl.value !== null) {
      return this.formControl.value <= this.min;
    }
    return false;
  }

  public isIncrementDisabled(): boolean {
    if (this.formControl.value !== null) {
      return this.formControl.value >= this.max;
    }
    return false;
  }
}
