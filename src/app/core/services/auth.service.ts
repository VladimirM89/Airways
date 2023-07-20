import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isPopupActive = false;

  public togglePopup(): void {
    this.isPopupActive = !this.isPopupActive;
  }

  public closePopup(): void {
    this.isPopupActive = false;
  }
}
