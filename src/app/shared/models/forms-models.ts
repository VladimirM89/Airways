import { FormControl, FormGroup } from '@angular/forms';

export interface PassengersFormGroup {
  adult: FormControl<number | null>;
  children: FormControl<number | null>;
  infant: FormControl<number | null>;
}

export interface DateRangeFormGroup {
  departureDate: FormControl<Date | null>;
  destinationDate: FormControl<Date | null>;
}

export interface FlightsForm {
  roundTrip: FormControl<'round' | 'one-way' | null>;
  departure: FormControl<string | null>;
  destination: FormControl<string | null>;
  range: FormGroup<DateRangeFormGroup>;
  passengers: FormGroup<PassengersFormGroup>;
}
