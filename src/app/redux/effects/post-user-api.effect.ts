/* eslint-disable import/no-extraneous-dependencies */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { addUserToState, registerUser } from '../actions/user.action';

@Injectable()
export default class PostUserApi {
  public constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  private postUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      switchMap(value =>
        this.apiService.registerUser(value.user).pipe(
          catchError(() => {
            alert('This user is already registered');
            return throwError('This user is already registered');
          }),
          map(user => addUserToState({ user }))
        )
      )
    );
  });
}
