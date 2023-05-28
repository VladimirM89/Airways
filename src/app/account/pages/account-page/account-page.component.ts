import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from 'src/app/redux/actions/user.action';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  public constructor(private store: Store, private router: Router) {}

  public logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logoutUser({ user: null }));
    this.router.navigate([Paths.BASE]);
  }
}
