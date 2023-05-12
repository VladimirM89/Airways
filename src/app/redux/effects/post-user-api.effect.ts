/* eslint-disable import/no-extraneous-dependencies */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { addUserToState, registerUser } from '../actions/user.action';

@Injectable()
export default class PostUserApi {
  public constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private handleErrorApiService: HandleErrorApiService
  ) {}

  private postUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      switchMap(value =>
        this.apiService.registerUser(value.user).pipe(
          catchError((error: HttpErrorResponse) =>
            this.handleErrorApiService.handleError(error)
          ),
          map(user => addUserToState({ user }))
        )
      )
    );
  });
}
