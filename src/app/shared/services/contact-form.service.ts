/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PHONE_REGEXP } from '../constants/string-constants';
import CountryCodeValidators from '../validators/countryCode.validators';
import { Nullable } from '../models/types';
import { MobileInfo } from '../models/booking';

@Injectable()
export class ContactFormService {
  public form: FormGroup | null = null;

  public createContactForm(contact: Nullable<MobileInfo>): FormGroup {
    this.form = new FormGroup({
      countryCode: new FormControl<string>(contact?.countryCode || '', [
        Validators.required,
        CountryCodeValidators.isIncorrectValue,
      ]),
      number: new FormControl<string>(contact?.number || '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern(PHONE_REGEXP),
      ]),
    });

    return this.form;
  }

  public get countryCode(): AbstractControl<string> | null {
    return this.form?.get('countryCode') || null;
  }

  public get countryCodeErrors(): ValidationErrors | null | undefined {
    return this.form?.get('countryCode')?.errors;
  }

  public get number(): AbstractControl<string> | null {
    return this.form?.get('number') || null;
  }

  public get numberErrors(): ValidationErrors | null | undefined {
    return this.form?.get('number')?.errors;
  }
}
