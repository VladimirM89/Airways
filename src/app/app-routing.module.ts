import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './types/enums';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {
    path: Paths.BOOKING,
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingModule),
  },
  {
    path: Paths.CART,
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        m => m.ShoppingCartModule
      ),
  },
  {
    path: Paths.ACCOUNT,
    loadChildren: () =>
      import('./account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
