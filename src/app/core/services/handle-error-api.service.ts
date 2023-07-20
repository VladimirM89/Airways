/* eslint-disable class-methods-use-this */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorApiService {
  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 500) {
      return throwError('Internal server error');
    }
    if (error.status === 404) {
      take(3);
      return throwError('Not found');
    }
    return throwError('Unknown error');
  }
}
