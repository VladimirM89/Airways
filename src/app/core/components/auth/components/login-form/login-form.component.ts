import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { loginUser } from 'src/app/redux/actions/user.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public hide = true;

  public constructor(private authService: AuthService, private store: Store) {}

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
    if (this.email && this.pass) {
      this.store.dispatch(
        loginUser({
          user: {
            email: this.email.value,
            password: this.pass.value,
          },
        })
      );
    }
    this.loginForm.reset();
    this.authService.togglePopup();
  }
}
