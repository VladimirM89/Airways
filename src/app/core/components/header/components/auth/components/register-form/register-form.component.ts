import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import PasswordValidators from 'src/app/shared/validators/password.validators';
import {
  NAME_REGEXP,
  PHONE_REGEXP,
} from 'src/app/shared/constants/string-constants';
import DateValidators from 'src/app/shared/validators/date.validators';
import CountryCodeValidators from 'src/app/shared/validators/countryCode.validators';
import { AuthService } from '../../services/auth.service';
import { CountryCodes } from './constants/country-codes';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public hide = true;

  public isMale = true;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      pass: new FormControl<string>('', [
        Validators.required,
        PasswordValidators.checkStrongPassword,
      ]),
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
      citizenship: new FormControl<string>(''),
      isAgree: new FormControl<boolean>(false, [Validators.requiredTrue]),
    });
  }

  public get email(): AbstractControl<string> | null {
    return this.loginForm.get('email');
  }

  public get emailErrors(): ValidationErrors | undefined | null {
    return this.loginForm.get('email')?.errors;
  }

  public get pass(): AbstractControl<string> | null {
    return this.loginForm.get('pass');
  }

  public get passErrors(): ValidationErrors | undefined | null {
    return this.loginForm.get('pass')?.errors;
  }

  public get firstName(): AbstractControl<string> | null {
    return this.loginForm.get('firstName');
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.loginForm.get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.loginForm.get('lastName');
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.loginForm.get('lastName')?.errors;
  }

  public get date(): AbstractControl<string> | null {
    return this.loginForm.get('date');
  }

  public get dateErrors(): ValidationErrors | null | undefined {
    return this.loginForm.get('date')?.errors;
  }

  public get countryCode(): AbstractControl<string> | null {
    return this.loginForm.get('countryCode');
  }

  public get countryCodeErrors(): ValidationErrors | null | undefined {
    return this.loginForm.get('countryCode')?.errors;
  }

  public get number(): AbstractControl<string> | null {
    return this.loginForm.get('number');
  }

  public get numberErrors(): ValidationErrors | null | undefined {
    return this.loginForm.get('number')?.errors;
  }

  public get citizenship(): AbstractControl<string> | null {
    return this.loginForm.get('citizenship');
  }

  public toggleGender(): void {
    this.isMale = !this.isMale;
  }

  public onSubmit(): void {
    this.authService.togglePopup();
  }
}
