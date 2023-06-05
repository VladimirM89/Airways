import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserAuthBoolean } from 'src/app/redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  public constructor(private store: Store) {}

  public canActivate(): Observable<boolean> {
    return this.store.select(selectUserAuthBoolean);
  }

  public canLoad(): Observable<boolean> {
    return this.store.select(selectUserAuthBoolean);
  }
}
