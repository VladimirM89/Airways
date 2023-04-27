/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NAME_REGEXP, PHONE_REGEXP } from '../constants/string-constants';
import DateValidators from '../validators/date.validators';

@Injectable({
  providedIn: 'root',
})
export class PassengersInfoServiceService {
  public isMale = true;

  public toggleGender(): void {
    this.isMale = !this.isMale;
  }

  public passengerInfoForm(): FormGroup {
    const passengersFormGroup = new FormGroup({
      firstName: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.minLength(3),
      ]),
      lastName: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.minLength(3),
      ]),
      date: new FormControl<Date | null>(new Date(), [
        Validators.required,
        DateValidators.isFutureDate,
      ]),
      number: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern(PHONE_REGEXP),
      ]),
    });
    return passengersFormGroup;
  }

  public get firstName(): AbstractControl<string> | null {
    return this.passengerInfoForm().get('firstName');
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.passengerInfoForm().get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.passengerInfoForm().get('lastName');
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.passengerInfoForm().get('lastName')?.errors;
  }

  public get date(): AbstractControl<string> | null {
    return this.passengerInfoForm().get('date');
  }

  public get dateErrors(): ValidationErrors | null | undefined {
    return this.passengerInfoForm().get('date')?.errors;
  }
}
