import { FormControl } from '@angular/forms';

export interface PassengerCounter {
  category: string;
  description: string;
  controlName: string;
  control: FormControl<number | null>;
}
