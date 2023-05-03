/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public hide = true;

  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      pass: new FormControl<string>('', [Validators.required]),
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

  public onSubmit(): void {
    this.loginForm.reset();
    this.authService.togglePopup();
  }
}
