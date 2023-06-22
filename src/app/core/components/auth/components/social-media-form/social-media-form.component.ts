/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CredentialResponse } from 'google-one-tap';
import { GOOGLE_CLIENT } from 'src/app/shared/constants/api-constants';
import { Store } from '@ngrx/store';
import { authGoogle } from 'src/app/redux/actions/user.action';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
})
export class SocialMediaFormComponent implements OnInit {
  public constructor(private store: Store, private authService: AuthService) {}

  public ngOnInit(): void {
    // @ts-ignore
    window.onload = (): void => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const parent = document.getElementById('googleBtn') as HTMLElement;
      // @ts-ignore
      google.accounts.id.renderButton(parent, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
      });
    };
  }

  private handleCredentialResponse(response: CredentialResponse): void {
    this.store.dispatch(
      authGoogle({
        jwtCredentials: response.credential,
      })
    );
    this.authService.closePopup();
  }
}
