/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NAME_REGEXP } from '../constants/string-constants';
import DateValidators from '../validators/date.validators';

@Injectable()
export class PersonalInfoFormService {
  public isMale = true;

  public toggleGender(): void {
    this.isMale = !this.isMale;
  }

  public personalFormGroup = this.createPersonalInfoForm();

  private createPersonalInfoForm(): FormGroup {
    return new FormGroup({
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
    });
  }

  public get firstName(): AbstractControl<string> | null {
    return this.personalFormGroup.get('firstName');
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.personalFormGroup.get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.personalFormGroup.get('lastName');
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.personalFormGroup.get('lastName')?.errors;
  }

  public get date(): AbstractControl<string> | null {
    return this.personalFormGroup.get('date');
  }

  public get dateErrors(): ValidationErrors | null | undefined {
    return this.personalFormGroup.get('date')?.errors;
  }

  public get formValid(): boolean {
    return this.personalFormGroup.invalid;
  }
}
