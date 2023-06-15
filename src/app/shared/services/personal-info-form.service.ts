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
import { DateValidators } from '../validators/date.validators';
import { Passenger } from '../models/booking';
import { Nullable } from '../models/types';
import { checkUserAge } from '../validators/dateOfBirth.validators';

@Injectable()
export class PersonalInfoFormService {
  public isMale: boolean | null = null;

  public form: FormGroup | null = null;

  public toggleGender(): void {
    this.isMale = !this.isMale;
    this.setGender();
  }

  public setGender(): void {
    let gender = '';
    this.isMale ? (gender = Gender.MALE) : (gender = Gender.FEMALE);
    this.sex?.setValue(gender);
  }

  public createPersonalInfoForm(
    item: Nullable<Passenger>,
    category?: string
  ): FormGroup {
    if (item) {
      this.isMale = item.sex === Gender.MALE;
    } else {
      this.isMale = true;
    }
    this.form = new FormGroup({
      category: new FormControl<string>(category || ''),
      firstName: new FormControl<string>(item?.firstName || '', [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.minLength(3),
      ]),
      lastName: new FormControl<string>(item?.lastName || '', [
        Validators.required,
        Validators.pattern(NAME_REGEXP),
        Validators.minLength(3),
      ]),
      dateOfBirth: new FormControl<Date | null>(
        item?.dateOfBirth ? new Date(item.dateOfBirth) : null,
        [
          Validators.required,
          DateValidators.isFutureDate,
          checkUserAge(category),
        ]
      ),
      sex: new FormControl<string>(this.isMale ? Gender.MALE : Gender.FEMALE),
    });

    return this.form;
  }

  public get firstName(): AbstractControl<string> | null {
    return this.form?.get('firstName') || null;
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.form?.get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.form?.get('lastName') || null;
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.form?.get('lastName')?.errors;
  }

  public get dateOfBirth(): AbstractControl<string> | null {
    return this.form?.get('dateOfBirth') || null;
  }

  public get dateOfBirthErrors(): ValidationErrors | null | undefined {
    return this.form?.get('dateOfBirth')?.errors;
  }

  public get sex(): AbstractControl<string> | null {
    return this.form?.get('sex') || null;
  }
}
