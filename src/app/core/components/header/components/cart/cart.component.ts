import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from 'src/app/redux/selectors/user.selectors';
import { Nullable } from 'src/app/shared/models/types';
import { UserStateInterface } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public constructor(private router: Router, private store: Store) {}

  // TODO: get count of flights in cart from cart-service
  public count = 1;

  public get isUserLogin$(): Observable<Nullable<UserStateInterface>> {
    return this.store.select(selectUserData);
  }

  public navToCart(): void {
    this.router.navigate([Paths.CART]);
  }
}
