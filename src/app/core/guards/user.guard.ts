/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @ngrx/avoid-mapping-selectors */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { selectUserDate } from 'src/app/redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  public constructor(private store: Store) {}

  public canActivate(): Observable<boolean> {
    return this.userLogin();
  }

  public canLoad(): Observable<boolean> {
    return this.userLogin();
  }

  private userLogin(): Observable<boolean> {
    return this.store.select(selectUserDate).pipe(
      map(item => {
        return item !== null;
      })
    );
  }
}
