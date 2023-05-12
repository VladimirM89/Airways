/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectUserData } from 'src/app/redux/selectors/user.selectors';
import { Paths } from 'src/app/types/enums';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  private isUserLogin = false;

  public constructor(private router: Router, private store: Store) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userLogin();
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userLogin();
  }

  private getUserFromStore(): void {
    this.store
      .select(selectUserData)
      .pipe(tap(item => (this.isUserLogin = item !== null)))
      .subscribe()
      .unsubscribe();
  }

  private userLogin(): boolean {
    this.getUserFromStore();

    return this.isUserLogin;
  }
}
