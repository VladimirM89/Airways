import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartPageComponent } from './pages/cart-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule],
})
export class ShoppingCartModule {}
