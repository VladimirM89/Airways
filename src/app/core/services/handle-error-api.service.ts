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
      return throwError('This user is already registered');
    }
    if (error.status === 404) {
      take(3);
      return throwError('Server not found');
    }
    return throwError('Unknown error');
  }
}
