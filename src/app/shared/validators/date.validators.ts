import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { FlightsForm } from '../models/forms-models';

export class DateValidators {
  public static isFutureDate(
    control: FormControl<Date>
  ): { [key: string]: boolean } | null {
    if (control.value) {
      const userDate = control.value.getTime();
      const currentDate = new Date().getTime();
      if (currentDate - userDate > 0) return null;
    }
    return { isFutureDate: true };
  }
}

export function isDateInPast(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const controlDate = control.value.getTime();
      const currentDate = new Date().getTime();
      if (currentDate - controlDate > 0) {
        return { isDateInPast: true };
      }
    }
    return null;
  };
}

export function isFlightsDateRangeValid(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const flightsForm = form as FormGroup<FlightsForm>;
    const departureDate =
      flightsForm.controls.range.get('departureDate')?.value;
    const destinationDate =
      flightsForm.controls.range.get('destinationDate')?.value;
    const isRoundTrip = flightsForm.controls.roundTrip.value === 'round';

    if (!departureDate && !destinationDate) {
      return null;
    }

    if (!destinationDate && isRoundTrip) {
      return { isRangeValid: 'please select destination date' };
    }

    if (!isRoundTrip) {
      return null;
    }
    if (departureDate && destinationDate) {
      return departureDate.getTime() - destinationDate.getTime() > 0
        ? { isRangeValid: 'destination date can not be before departure' }
        : null;
    }
    return null;
  };
}
