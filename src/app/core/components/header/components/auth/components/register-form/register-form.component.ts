import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PersonalInfoFormService } from 'src/app/shared/services/personal-info-form.service';
import { PHONE_REGEXP } from 'src/app/shared/constants/string-constants';
import CountryCodeValidators from 'src/app/shared/validators/countryCode.validators';
import PasswordValidators from 'src/app/shared/validators/password.validators';
import { AuthService } from '../../services/auth.service';
import { CountryCodes } from './constants/country-codes';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [PersonalInfoFormService],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;

  public isMale = true;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  public passengersInfoForm!: FormGroup;

  public constructor(
    private authService: AuthService,
    public personalInfoFormService: PersonalInfoFormService
  ) {}

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      pass: new FormControl<string>('', [
        Validators.required,
        PasswordValidators.checkStrongPassword,
      ]),
      passengersInfoForm: this.personalInfoFormService.personalFormGroup,
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

  public get passengersInfo(): FormGroup {
    return this.registerForm.get('passengersInfoForm') as FormGroup;
  }

  public get email(): AbstractControl<string> | null {
    return this.registerForm.get('email');
  }

  public get emailErrors(): ValidationErrors | undefined | null {
    return this.registerForm.get('email')?.errors;
  }

  public get pass(): AbstractControl<string> | null {
    return this.registerForm.get('pass');
  }

  public get passErrors(): ValidationErrors | undefined | null {
    return this.registerForm.get('pass')?.errors;
  }

  public get countryCode(): AbstractControl<string> | null {
    return this.registerForm.get('countryCode');
  }

  public get countryCodeErrors(): ValidationErrors | null | undefined {
    return this.registerForm.get('countryCode')?.errors;
  }

  public get number(): AbstractControl<string> | null {
    return this.registerForm.get('number');
  }

  public get numberErrors(): ValidationErrors | null | undefined {
    return this.registerForm.get('number')?.errors;
  }

  public get citizenship(): AbstractControl<string> | null {
    return this.registerForm.get('citizenship');
  }

  public onSubmit(): void {
    this.authService.togglePopup();
  }
}
