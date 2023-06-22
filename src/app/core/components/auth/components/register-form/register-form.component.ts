/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import { DatePipe } from '@angular/common';
import { DateFormat, Gender } from 'src/app/types/enums';
import { Store } from '@ngrx/store';
import { registerUser } from 'src/app/redux/actions/user.action';
import { RegistrationDto } from 'src/app/shared/models/user.model';
import { dialCode } from 'src/app/shared/utils';
import { AuthService } from 'src/app/core/services/auth.service';
import { CountryCodes } from './constants/country-codes';
import { CountryCode } from './constants/types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [PersonalInfoFormService, ContactFormService, DatePipe],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;

  public passengersInfoForm!: FormGroup;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  public constructor(
    private authService: AuthService,
    private personalInfoFormService: PersonalInfoFormService,
    private contactFormService: ContactFormService,
    private datepipe: DatePipe,
    private store: Store
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
      passengersInfoForm:
        this.personalInfoFormService.createPersonalInfoForm(null),
      contactForm: this.contactFormService.createContactForm(null),
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

  public trackByFnErr(index: number, item: string): string {
    return item;
  }

  public onSubmit(): void {
    this.store.dispatch(
      registerUser({
        user: this.userInfo(),
      })
    );
    this.clearForm();
    this.authService.togglePopup();
  }

  private userInfo(): RegistrationDto {
    return {
      email: this.email?.value!,
      password: this.pass?.value!,
      firstName: this.personalInfoFormService.firstName?.value!,
      lastName: this.personalInfoFormService.lastName?.value!,
      dateOfBirth:
        this.datepipe.transform(
          this.personalInfoFormService.dateOfBirth?.value,
          DateFormat.DDMMYYYY
        ) || '',
      sex: this.personalInfoFormService.isMale ? Gender.MALE : Gender.FEMALE,
      phone: `${dialCode(this.contactFormService.countryCode?.value!)}${String(
        this.contactFormService.number?.value
      )}`,
      citizenship: this.citizenship?.value!,
    };
  }

  private clearForm(): void {
    this.passengersInfo.reset();
    this.contactForm.reset();
    this.registerForm.reset();
  }
}
