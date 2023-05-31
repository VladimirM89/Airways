import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutUser } from 'src/app/redux/actions/user.action';
import {
  selectAllBookings,
  selectPaidBookings,
  selectUnpaidBookings,
} from 'src/app/redux/selectors/user.selectors';
import { UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  public constructor(private store: Store, private router: Router) {}

  public get allUserBookings$(): Observable<UserBooking[]> {
    return this.store.select(selectAllBookings);
  }

  public get paidUserBookings$(): Observable<UserBooking[]> {
    return this.store.select(selectPaidBookings);
  }

  public get unpaidUserBookings$(): Observable<UserBooking[]> {
    return this.store.select(selectUnpaidBookings);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logoutUser({ user: null }));
    this.router.navigate([Paths.BASE]);
  }
}
