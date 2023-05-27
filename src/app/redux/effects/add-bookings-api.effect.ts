import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBookingsService } from 'src/app/core/services/api-bookings.service';
import { BookingDto, BookingItem } from 'src/app/shared/models/api-models';
import { UserBooking } from 'src/app/shared/models/user.model';
import { HandleErrorApiService } from 'src/app/core/services/handle-error-api.service';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import { addBookingToServer, addBookingsToState } from '../actions/user.action';
import { Nullable } from 'src/app/shared/models/types';

@Injectable()
export class AddBookingsApi {
  public constructor(
    private actions$: Actions,
    private apiBookings: ApiBookingsService,
    private apiFlightService: ApiFlightService,
    private handleErrorApiService: HandleErrorApiService
  ) {}

  private addBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBookingToServer),
      switchMap(action =>
        this.apiBookings
          .addBooking(action.booking)
          .pipe(
            catchError((error: HttpErrorResponse) =>
              this.handleErrorApiService.handleError(error)
            ),
            switchMap(bookingItem => {
              const forwardFlight = this.apiFlightService.getFlightById(bookingItem.forwardFlightId),
              const userBooking = {
                id: bookingItem.id,
                paid: false,
                flights: [
                  this.apiFlightService.getFlightById(bookingItem.forwardFlightId),
                  this.apiFlightService.getFlightById(bookingItem.returnFlightId),
                ],
                bookingInfo: {
                  roundTrip: bookingItem.returnFlightId ? true : false,
                  departureAirport: string;
                  destinationAirport: string;
                  departureDate: string;
                  returnDate: string;
                  passengers: PassengersNumber;
                }
              }
            })
          )
      )
    );
  });


  private createBookingAddToState(booking: BookingItem): UserBooking {
    return {
      id: booking.id,
      paid: false,
      bookingInfo: {
        roundTrip: booking.returnFlightId ? true : false,
        departureAirport:
      }
      flights: [
        this.apiFlightService.getFlightById(booking.forwardFlightId),
        this.apiFlightService.getFlightById(booking.returnFlightId),
      ],
    };
  }
}
