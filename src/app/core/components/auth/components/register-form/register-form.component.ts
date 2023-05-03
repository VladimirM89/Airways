/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PersonalInfoFormService } from 'src/app/shared/services/personal-info-form.service';
import PasswordValidators from 'src/app/shared/validators/password.validators';
import { ContactFormService } from 'src/app/shared/services/contact-form.service';
import { AuthService } from '../../services/auth.service';
import { CountryCodes } from './constants/country-codes';
import { CountryCode } from './constants/types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [PersonalInfoFormService, ContactFormService],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;

  public isMale = true;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  public passengersInfoForm!: FormGroup;

  public constructor(
    private authService: AuthService,
    private personalInfoFormService: PersonalInfoFormService,
    private contactFormService: ContactFormService
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
      contactForm: this.contactFormService.contactFormGroup,
      citizenship: new FormControl<string>(''),
      isAgree: new FormControl<boolean>(false, [Validators.requiredTrue]),
    });
  }

  public get passengersInfo(): FormGroup {
    return this.registerForm.get('passengersInfoForm') as FormGroup;
  }

  public get contactForm(): FormGroup {
    return this.registerForm.get('contactForm') as FormGroup;
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

  public get citizenship(): AbstractControl<string> | null {
    return this.registerForm.get('citizenship');
  }

  public trackByFnCountries(index: number, item: CountryCode): number {
    return item.id;
  }

  public trackByFnErr(index: number): number {
    return index;
  }

  public onSubmit(): void {
    this.authService.togglePopup();
  }
}
