/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/redux/selectors/user.selectors';
import { Subscription, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public isUserLogin = false;

  private userLoginSub!: Subscription;

  public userName = '';

  public isLoginInSelect = true;

  public constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.userLoginSub = this.store
      .select(selectUserData)
      .pipe(
        tap(item => {
          item ? (this.isUserLogin = true) : (this.isUserLogin = false);
          this.userName = item?.firstName || 'Name';
        })
      )
      .subscribe();
  }

  public toggleAuthForms(): void {
    this.isLoginInSelect = !this.isLoginInSelect;
  }

  public togglePopup(): void {
    this.authService.togglePopup();
  }

  public navToUserPage(): void {
    this.router.navigate([Paths.ACCOUNT]);
  }

  public ngOnDestroy(): void {
    this.userLoginSub.unsubscribe();
  }
}
