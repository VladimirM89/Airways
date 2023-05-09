/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ApiService } from 'src/app/core/services/api.service';
import { DatePipe } from '@angular/common';
import { DIAL_CODE_REGEXP } from 'src/app/shared/constants/string-constants';
import { DateFormat, Gender } from 'src/app/types/enums';
import { Subscription, catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { addUser } from 'src/app/redux/actions/user.action';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import { CountryCodes } from './constants/country-codes';
import { CountryCode } from './constants/types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [PersonalInfoFormService, ContactFormService, DatePipe],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;

  public passengersInfoForm!: FormGroup;

  public countries = CountryCodes;

  public countriesName = CountryCodes;

  private registerSub!: Subscription;

  public constructor(
    private authService: AuthService,
    private personalInfoFormService: PersonalInfoFormService,
    private contactFormService: ContactFormService,
    private apiService: ApiService,
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

  public trackByFnErr(index: number, item: string): string {
    return item;
  }

  public onSubmit(): void {
    this.store.dispatch(
      addUser({
        user: this.userInfo(),
      })
    );
    this.registerSub = this.apiService
      .registerUser(this.userInfo())
      .pipe(
        catchError(error => {
          console.log(error, 'User not registered');
          return throwError(error);
        })
      )
      .subscribe(response => console.log(response, 'user is registered'));
    this.authService.togglePopup();
  }

  private dialCode(): string {
    const value = this.contactFormService.countryCode?.value;
    const code = value?.match(DIAL_CODE_REGEXP);
    if (code) {
      return code[1].replace(' ', '');
    }
    return '+';
  }

  private userInfo(): User {
    return {
      email: this.email?.value!,
      password: this.pass?.value!,
      firstName: this.personalInfoFormService.firstName?.value!,
      lastName: this.personalInfoFormService.lastName?.value!,
      dateOfBirth:
        this.datepipe.transform(
          this.personalInfoFormService.date?.value,
          DateFormat.DDMMYYYY
        ) || '',
      sex: this.personalInfoFormService.isMale ? Gender.MALE : Gender.FEMALE,
      pnone: `${this.dialCode()}${String(
        this.contactFormService.number?.value
      )}`,
      citizenship: this.citizenship?.value!,
    };
  }

  public ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }
}
