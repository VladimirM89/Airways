import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectUnpaidBookings,
  selectUserDate,
} from 'src/app/redux/selectors/user.selectors';
import { Nullable } from 'src/app/shared/models/types';
import { User, UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public constructor(private router: Router, private store: Store) {}

  public get bookings$(): Observable<UserBooking[]> {
    return this.store.select(selectUnpaidBookings);
  }

  public get isUserLogin$(): Observable<Nullable<User>> {
    return this.store.select(selectUserDate);
  }

  public navToCart(): void {
    this.router.navigate([Paths.CART]);
  }
}
