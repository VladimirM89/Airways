import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUserService } from 'src/app/core/services/api-user.service';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { addUserToState, registerUser } from '../actions/user.action';

@Injectable()
export default class PostUserApi {
  public constructor(
    private actions$: Actions,
    private apiUserService: ApiUserService,
    private handleErrorApiService: HandleErrorApiService
  ) {}

  private postUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      switchMap(action =>
        this.apiUserService.registerUser(action.user).pipe(
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
