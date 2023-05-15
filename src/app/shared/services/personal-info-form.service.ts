/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Gender } from 'src/app/types/enums';
import { NAME_REGEXP } from '../constants/string-constants';
import DateValidators from '../validators/date.validators';

@Injectable()
export class PersonalInfoFormService {
  public isMale = true;

  public toggleGender(): void {
    this.isMale = !this.isMale;
    let gender = '';
    this.isMale ? (gender = Gender.MALE) : (gender = Gender.FEMALE);
    this.sex?.setValue(gender);
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
      dateOfBirth: new FormControl<Date | null>(new Date(), [
        Validators.required,
        DateValidators.isFutureDate,
      ]),
      sex: new FormControl<string>(Gender.MALE),
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

  public get dateOfBirth(): AbstractControl<string> | null {
    return this.personalFormGroup.get('dateOfBirth');
  }

  public get dateOfBirthErrors(): ValidationErrors | null | undefined {
    return this.personalFormGroup.get('dateOfBirth')?.errors;
  }

  public get sex(): AbstractControl<string> | null {
    return this.personalFormGroup.get('sex');
  }
}
