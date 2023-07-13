/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CountryCodes } from 'src/app/core/components/auth/components/register-form/constants/country-codes';
import { CountryCode } from 'src/app/core/components/auth/components/register-form/constants/types';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() public contactFormGroup!: FormGroup;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

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

  public trackByFn(index: number, item: CountryCode): number {
    return item.id;
  }
}
