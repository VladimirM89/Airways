import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { addUserToState } from 'src/app/redux/actions/user.action';
import { selectUserDate } from 'src/app/redux/selectors/user.selectors';
import { ApiUserService } from '../../services/api-user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public user$ = this.store.select(selectUserDate);

  private userLoginSub!: Subscription;

  public isLoginInSelect = true;

  public constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store,
    private apiUserService: ApiUserService
  ) {}

  public ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userLoginSub = this.apiUserService
        .getUser(token)
        .pipe(
          map(user => {
            this.store.dispatch(addUserToState({ user }));
          })
        )
        .subscribe();
    }
  }

  public openLoginForm(): void {
    this.isLoginInSelect = true;
  }

  public openRegisterForm(): void {
    this.isLoginInSelect = false;
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
