import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PassengersFormGroup } from '../models/forms-models';

export function checkIfPassengersValid(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passengersForm = form as PassengersFormGroup;
    const adults = passengersForm.controls.adult.value;
    const infants = passengersForm.controls.infant.value;
    if (!adults) {
      return { isPassengersValid: 'should be at least 1 adult passenger' };
    }
    if (adults < infants) {
      return {
        isPassengersValid: 'every infant should be accompanied by adult',
      };
    }
    return null;
  };
}
