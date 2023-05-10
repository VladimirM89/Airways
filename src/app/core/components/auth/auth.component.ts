/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  // TODO: get user from state
  public isUserLogin = false;

  public isLoginInSelect = true;

  public constructor(public authService: AuthService, private router: Router) {}

  public toggleAuthForms(): void {
    this.isLoginInSelect = !this.isLoginInSelect;
  }

  public togglePopup(): void {
    this.authService.togglePopup();
  }

  // TODO: get user name via user Service from backend
  public get userName(): string {
    return 'Name';
  }

  public navToUserPage(): void {
    this.router.navigate([Paths.ACCOUNT]);
  }
}
