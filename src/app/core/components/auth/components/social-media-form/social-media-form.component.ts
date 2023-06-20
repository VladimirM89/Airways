/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CredentialResponse } from 'google-one-tap';
import { GOOGLE_CLIENT } from 'src/app/shared/constants/api-constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
})
export class SocialMediaFormComponent implements OnInit {
  public constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT,
        callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const parent = document.getElementById('googleBtn') as HTMLElement;
      // @ts-ignore
      google.accounts.id.renderButton(parent, {
        theme: 'outline',
        size: 'large',
        width: parent.offsetWidth,
      });
      // @ts-ignore
      google.accounts.id.prompt(() => {});
    };
  }

  private handleCredentialResponse(response: CredentialResponse): void {
    console.log(response);
  }
}
