import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CountryCodes } from 'src/app/core/components/header/components/auth/components/register-form/constants/country-codes';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() public contactFormGroup!: FormGroup;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  public get email(): AbstractControl<string> | null {
    return this.contactFormGroup.get('email');
  }

  public get emailErrors(): ValidationErrors | undefined | null {
    return this.contactFormGroup.get('email')?.errors;
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
