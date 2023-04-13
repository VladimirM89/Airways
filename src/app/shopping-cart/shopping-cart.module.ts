import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, ShoppingCartRoutingModule],
})
export class ShoppingCartModule {}
