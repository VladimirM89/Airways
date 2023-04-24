/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import PasswordValidators from 'src/app/shared/validators/password.validators';
import { NAME_REGEXP } from 'src/app/shared/constants/string-constants';
import DateValidators from 'src/app/shared/validators/date.validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public hide = true;

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

  public onSubmit(): void {
    this.authService.togglePopup();
  }
}
