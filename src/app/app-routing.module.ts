import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingModule),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        m => m.ShoppingCartModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
