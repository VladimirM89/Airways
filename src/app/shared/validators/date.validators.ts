import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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
  return (rangeFormGroup: AbstractControl): ValidationErrors | null => {
    const departureDate = rangeFormGroup.get('departureDate')?.value;
    const destinationDate = rangeFormGroup.get('destinationDate')?.value;
    const currentDate = new Date().getTime();

    if (!departureDate && !destinationDate) {
      return null;
    }

    if (!destinationDate) {
      return { isRangeValid: 'please select destination date' };
    }

    if (departureDate.getTime() - destinationDate.getTime() > 0) {
      return { isRangeValid: 'destination date can not be before departure' };
    }

    if (
      currentDate - departureDate.getTime() > 0 ||
      currentDate - destinationDate.getTime() > 0
    ) {
      return { isRangeValid: 'please select dates in future' };
    }
    return null;
  };
}
