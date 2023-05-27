import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUserService } from 'src/app/core/services/api-user.service';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { UserBooking } from 'src/app/shared/models/user.model';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import { PassengersNumber } from 'src/app/shared/models/booking';
import {
  addBookingToState,
  addUserToState,
  createBooking,
  registerUser,
} from '../actions/user.action';
import { ApiBookingsService } from '../../core/services/api-bookings.service';

@Injectable()
export class UserEffects {
  public constructor(
    private actions$: Actions,
    private apiUserService: ApiUserService,
    private handleErrorApiService: HandleErrorApiService,
    private apiBookingsService: ApiBookingsService,
    private apiFlightService: ApiFlightService
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

  private addBooking = createEffect(() => {
    const userBooking: UserBooking = {
      id: 0,
      paid: false,
      bookingInfo: {
        roundTrip: false,
        departureAirport: '',
        destinationAirport: '',
        departureDate: '',
        returnDate: '',
        passengers: {
          adult: 0,
          child: 0,
          infant: 0,
        },
      },
      flights: [],
      passengers: null,
    };

    return this.actions$.pipe(
      ofType(createBooking),
      switchMap(action =>
        this.apiBookingsService.addBooking(action.booking).pipe(
          map(bookingItem => {
            userBooking.id = bookingItem.id;
            userBooking.paid = bookingItem.paid;
            userBooking.bookingInfo.roundTrip = !!bookingItem.returnFlightId;
            userBooking.bookingInfo.departureAirport =
              bookingItem.forwardFlightData.departureAirport;
            userBooking.bookingInfo.destinationAirport =
              bookingItem.forwardFlightData.destinationAirport;
            userBooking.bookingInfo.departureDate =
              bookingItem.forwardFlightData.departureDate;
            userBooking.bookingInfo.returnDate = bookingItem.returnFlightData
              ? bookingItem.returnFlightData.departureDate
              : '';

            const passengersNumber: PassengersNumber = {
              adult: bookingItem.passengers.filter(
                passenger => passenger.category === 'adult'
              ).length,
              child: bookingItem.passengers.filter(
                passenger => passenger.category === 'child'
              ).length,
              infant: bookingItem.passengers.filter(
                passenger => passenger.category === 'infant'
              ).length,
            };
            userBooking.bookingInfo.passengers = passengersNumber;
            return addBookingToState({ booking: userBooking });
          })
        )
      )
    );
  });
}
