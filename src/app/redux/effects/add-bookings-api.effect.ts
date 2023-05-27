// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { ApiService } from 'src/app/core/services/api.service';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { HttpErrorResponse } from '@angular/common/http';
// import { addBookingToServer } from '../actions/user.action';

// @Injectable()
// export class AddBookingsApi {
//   public constructor(
//     private actions$: Actions,
//     private apiService: ApiService
//   ) {}

//   private addBookings$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(addBookingToServer),
//       switchMap(value =>
//         this.apiService.addBooking(value).pipe(
//           catchError((error: HttpErrorResponse) => console.log(error)),
//           map(bookings => addBookingsToState({ bookings }))
//         )
//       )
//     );
//   });
// }
