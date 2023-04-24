import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isUserLogin = false;

  public isPopupActive = false;

  public isLoginInSelect = true;

  public toggleAuthForms(): void {
    this.isLoginInSelect = !this.isLoginInSelect;
  }

  public togglePopup(): void {
    this.isPopupActive = !this.isPopupActive;
  }
}
