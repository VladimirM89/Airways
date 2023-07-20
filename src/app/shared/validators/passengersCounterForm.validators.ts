import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { PassengersFormGroup } from '../models/forms-models';

export function checkIfPassengersValid(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passengersForm = form as FormGroup<PassengersFormGroup>;
    const adults = passengersForm.controls.adult.value;
    const infants = passengersForm.controls.infant.value;
    if (!adults) {
      return { isPassengersValid: 'should be at least 1 adult passenger' };
    }
    if (adults && infants) {
      return adults < infants
        ? {
            isPassengersValid: 'every infant should be accompanied by adult',
          }
        : null;
    }
    return null;
  };
}
