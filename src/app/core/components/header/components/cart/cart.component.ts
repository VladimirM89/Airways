import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  public constructor(private router: Router) {}

  // TODO: get count of flights in cart from cart-service
  public count = 1;

  // TODO: get if user login from state
  public isUserLogin = true;

  public navToCart(): void {
    this.router.navigate([Paths.CART]);
  }
}
