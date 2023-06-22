/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiUserService } from 'src/app/core/services/api-user.service';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { UserBooking } from 'src/app/shared/models/user.model';
import {
  PassangersInfo,
  Passenger,
  PassengersNumber,
} from 'src/app/shared/models/booking';
import { BookingDto, BookingItem } from 'src/app/shared/models/api-models';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, of } from 'rxjs';
import {
  addBookingToState,
  addUserToState,
  createBooking,
  deleteBooking,
  updateBookingState,
  loginUser,
  registerUser,
  editBooking,
  authGoogle,
  cancelAction,
} from '../actions/user.action';
import { ApiBookingsService } from '../../core/services/api-bookings.service';
import { ToasterService } from '../../core/services/toaster.service';

@Injectable()
export class UserEffects {
  public constructor(
    private actions$: Actions,
    private apiUserService: ApiUserService,
    private handleErrorApiService: HandleErrorApiService,
    private apiBookingsService: ApiBookingsService,
    private toasterService: ToasterService
  ) {}

  private postUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUser),
      switchMap(action =>
        this.apiUserService.registerUser(action.user).pipe(
          catchError((error: HttpErrorResponse) => {
            this.toasterService.showError(error.error.message);
            return of(null);
          }),
          switchMap(userToken => {
            if (userToken) {
              localStorage.setItem('token', userToken.token);
              this.toasterService.showSuccess(
                'You have successfully registered'
              );
              return this.apiUserService
                .getUser(userToken.token)
                .pipe(map(user => addUserToState({ user })));
            }
            return of(cancelAction());
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
          catchError((error: HttpErrorResponse) => {
            this.toasterService.showError(error.error.message);
            return this.handleErrorApiService.handleError(error);
          }),
          map(bookingItem => {
            const userBooking = this.convertToUserBooking(bookingItem);
            this.toasterService.showSuccess('Booking added');
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
      contacts: {
        mobile: {
          countryCode: bookingItem.contactInfo.countryCode,
          number: bookingItem.contactInfo.number,
        },
        email: bookingItem.contactInfo.email,
      },
    };
    return userBooking;
  }

  private loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap(action =>
        this.apiUserService.loginUser(action.user).pipe(
          catchError((error: HttpErrorResponse) => {
            this.toasterService.showError(error.error.message);
            return of(null);
          }),
          switchMap(userToken => {
            if (userToken) {
              localStorage.setItem('token', userToken.token);
              this.toasterService.showSuccess(
                'You have successfully signed in'
              );
              return this.apiUserService.getUser(userToken.token).pipe(
                map(user => {
                  return addUserToState({ user });
                })
              );
            }
            return of(cancelAction());
          })
        )
      )
    );
  });

  private updateBookingState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addUserToState),
      switchMap(() => {
        const token = localStorage.getItem('token') || '';
        return this.apiBookingsService.getAllBookings(token).pipe(
          map(bookings => {
            const userBookings = bookings.map(booking =>
              this.convertToUserBooking(booking)
            );
            return updateBookingState({ bookings: userBookings });
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
            id: action.booking.id,
            token,
          })
          .pipe(switchMap(() => this.getAllBookings(token)));
      })
    );
  });

  private editBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editBooking),
      switchMap(action => {
        const token = localStorage.getItem('token') || '';
        return this.apiBookingsService
          .editBooking(
            action.booking.id,
            this.convertToBookingDto(action.booking)
          )
          .pipe(switchMap(() => this.getAllBookings(token)));
      })
    );
  });

  private getAllBookings(token: string): Observable<
    {
      bookings: UserBooking[];
    } & TypedAction<'[Booking] Add all bookings from server to state'>
  > {
    return this.apiBookingsService.getAllBookings(token).pipe(
      map(bookings => {
        const userBookings = bookings.map(booking =>
          this.convertToUserBooking(booking)
        );
        return updateBookingState({ bookings: userBookings });
      })
    );
  }

  private convertToBookingDto(booking: UserBooking): BookingDto {
    const token = localStorage.getItem('token') || '';
    return {
      token,
      paid: booking.paid,
      forwardFlightId: booking.flights[0].id,
      returnFlightId: booking.flights[1] ? booking.flights[1].id : null,
      passengers: this.convertToPassengers(booking.passengers!),
      contactInfo: {
        email: booking.passengers?.contacts.email || '',
        countryCode: booking.passengers?.contacts.mobile.countryCode || '',
        dialNumber: booking.passengers?.contacts.mobile.number || '',
        number: booking.passengers?.contacts.mobile.number || '',
      },
    };
  }

  private convertToPassengers(passengers: PassangersInfo): Passenger[] {
    const passengerArray: Passenger[] = [];
    if (passengers) {
      passengers.adult.forEach(item =>
        passengerArray.push({ category: 'adult', ...item })
      );
      passengers.child.forEach(item =>
        passengerArray.push({ category: 'child', ...item })
      );
      passengers.infant.forEach(item =>
        passengerArray.push({ category: 'infant', ...item })
      );
    }
    return passengerArray;
  }

  private authGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authGoogle),
      switchMap(action =>
        this.apiUserService
          .authWithGoogle({ token: action.jwtCredentials })
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.toasterService.showError('Can not log in with google');
              return this.handleErrorApiService.handleError(error);
            }),
            switchMap(userToken => {
              localStorage.setItem('token', userToken.token);
              this.toasterService.showSuccess(
                'You have successfully signed in'
              );
              return this.apiUserService
                .getUser(userToken.token)
                .pipe(map(user => addUserToState({ user })));
            })
          )
      )
    );
  });
}
