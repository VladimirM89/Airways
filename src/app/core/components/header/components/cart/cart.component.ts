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

  public navToCart(): void {
    this.router.navigate([Paths.CART]);
  }
}
