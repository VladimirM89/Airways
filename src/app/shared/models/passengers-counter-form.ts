import { FormControl, FormGroup } from '@angular/forms';

export type PassengersFormGroup = FormGroup<{
  adult: FormControl<number>;
  children: FormControl<number>;
  infant: FormControl<number>;
}>;
