import { AbstractControl } from '@angular/forms';

export interface PassengerCounter {
  category: string;
  description: string;
  controlName: string;
  control: AbstractControl;
}
