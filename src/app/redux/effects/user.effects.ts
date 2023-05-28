import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUserService } from 'src/app/core/services/api-user.service';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { UserBooking } from 'src/app/shared/models/user.model';
import { PassengersNumber } from 'src/app/shared/models/booking';
import { BookingItem } from 'src/app/shared/models/api-models';
import {
  addBookingToState,
  addUserToState,
  createBooking,
  deleteBooking,
  initializeBookingState,
  loginUser,
  registerUser,
} from '../actions/user.action';
import { ApiBookingsService } from '../../core/services/api-bookings.service';

@Injectable()
export class UserEffects {
  public constructor(
    private actions$: Actions,
    private apiUserService: ApiUserService,
    private handleErrorApiService: HandleErrorApiService,
    private apiBookingsService: ApiBookingsService
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
    return this.actions$.pipe(
      ofType(createBooking),
      switchMap(action =>
        this.apiBookingsService.addBooking(action.booking).pipe(
          map(bookingItem => {
            const userBooking = this.convertToUserBooking(bookingItem);
            return addBookingToState({ booking: userBooking });
          })
        )
      )
    );
  });

  private convertToUserBooking(bookingItem: BookingItem): UserBooking {
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

    const adult = bookingItem.passengers.filter(
      passenger => passenger.category === 'adult'
    );
    const child = bookingItem.passengers.filter(
      passenger => passenger.category === 'child'
    );
    const infant = bookingItem.passengers.filter(
      passenger => passenger.category === 'infant'
    );

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
      adult: adult.length,
      child: child.length,
      infant: infant.length,
    };
    userBooking.bookingInfo.passengers = passengersNumber;
    userBooking.flights.push(bookingItem.forwardFlightData);
    if (bookingItem.returnFlightData) {
      userBooking.flights.push(bookingItem.returnFlightData);
    }
    userBooking.passengers = {
      adult,
      child,
      infant,
      contacts: bookingItem.contactInfo,
    };
    return userBooking;
  }

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
            return this.apiUserService.getUser(userToken.token).pipe(
              map(user => {
                return addUserToState({ user });
              })
            );
          })
        )
      )
    );
  });

  private initializeBookingState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUserToState),
      switchMap(() => {
        const token = localStorage.getItem('token') || '';
        return this.apiBookingsService.getAllBookings(token).pipe(
          map(bookings => {
            const userBookings = bookings.map(booking =>
              this.convertToUserBooking(booking)
            );
            return initializeBookingState({ bookings: userBookings });
          })
        );
      })
    );
  });

  private deleteBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBooking),
      switchMap(action => {
        const token = localStorage.getItem('token') || '';
        return this.apiBookingsService
          .deleteBooking({
            id: action.bookings.id,
            token,
          })
          .pipe(
            switchMap(() => {
              return this.apiBookingsService.getAllBookings(token).pipe(
                map(bookings => {
                  const userBookings = bookings.map(booking =>
                    this.convertToUserBooking(booking)
                  );
                  return initializeBookingState({ bookings: userBookings });
                })
              );
            })
          );
      })
    );
  });
}
