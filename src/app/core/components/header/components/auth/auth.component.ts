import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isUserLogin = false;

  public isLoginInSelect = true;

  public constructor(public authService: AuthService) {}

  public toggleAuthForms(): void {
    this.isLoginInSelect = !this.isLoginInSelect;
  }

  public togglePopup(): void {
    this.authService.togglePopup();
  }
}
