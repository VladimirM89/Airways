import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {
  ADULT_MIN_AGE,
  CHILD_MAX_AGE,
  CHILD_MIN_AGE,
  INFANT_MAX_AGE,
  USER_MIN_AGE,
} from '../constants/string-constants';

function getAge(value: string): number {
  const dateOfBirth = new Date(value);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const month = currentDate.getMonth() - dateOfBirth.getMonth();
  const day = currentDate.getDate() - dateOfBirth.getDate();

  if (month < 0) {
    age -= 1;
  }
  if (month === 0) {
    if (day < 0) {
      age -= 1;
    } else if (day === 0) {
      return age;
    }
  }
  return age;
}

export function checkUserAge(category: string | undefined): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const age = getAge(form.value);
    if (age < USER_MIN_AGE && !category) {
      return { isAgeValid: 'for register your age must be over 18 years old' };
    }
    if (age < ADULT_MIN_AGE && category === 'adult') {
      return { isAgeValid: 'adult passenger must be over 15 years old' };
    }
    if (
      (age >= CHILD_MAX_AGE || age <= CHILD_MIN_AGE) &&
      category === 'child'
    ) {
      return {
        isAgeValid: 'child must be over 1 and under 14 years old',
      };
    }
    if (age >= INFANT_MAX_AGE && category === 'infant') {
      return { isAgeValid: 'infant must under 1 years old' };
    }
    return null;
  };
}
