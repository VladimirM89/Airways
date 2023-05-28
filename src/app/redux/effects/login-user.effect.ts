import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs';
import { ApiUserService } from 'src/app/core/services/api-user.service';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { addUserToState, loginUser } from '../actions/user.action';

@Injectable()
export default class LoginUser {
  public constructor(
    private actions$: Actions,
    private apiUserService: ApiUserService,
    private handleErrorApiService: HandleErrorApiService
  ) {}

  private loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap(action =>
        this.apiUserService.loginUser(action.user).pipe(
          catchError((error: HttpErrorResponse) =>
            this.handleErrorApiService.handleError(error)
          ),
          switchMap(userToken => {
            localStorage.setItem('token', userToken.token);
            return this.apiUserService
              .getUser(userToken.token)
              .pipe(map(user => addUserToState({ user })));
          })
        )
      )
    );
  });
}
