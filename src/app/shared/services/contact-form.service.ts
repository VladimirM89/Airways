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

@Injectable()
export class ContactFormService {
  public contactFormGroup = this.createContactForm();

  public createContactForm(): FormGroup {
    return new FormGroup({
      countryCode: new FormControl<string>('', [
        Validators.required,
        CountryCodeValidators.isIncorrectValue,
      ]),
      number: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern(PHONE_REGEXP),
      ]),
    });
  }

  public get countryCode(): AbstractControl<string> | null {
    return this.contactFormGroup.get('countryCode');
  }

  public get countryCodeErrors(): ValidationErrors | null | undefined {
    return this.contactFormGroup.get('countryCode')?.errors;
  }

  public get number(): AbstractControl<string> | null {
    return this.contactFormGroup.get('number');
  }

  public get numberErrors(): ValidationErrors | null | undefined {
    return this.contactFormGroup.get('number')?.errors;
  }
}
