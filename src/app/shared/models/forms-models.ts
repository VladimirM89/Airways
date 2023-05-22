import { FormControl, FormGroup } from '@angular/forms';

export type PassengersFormGroup = FormGroup<{
  adult: FormControl<number>;
  children: FormControl<number>;
  infant: FormControl<number>;
}>;

export type DateRangeFormGroup = FormGroup<{
  departureDate: FormControl<Date | null>;
  destinationDate: FormControl<Date | null>;
}>;
