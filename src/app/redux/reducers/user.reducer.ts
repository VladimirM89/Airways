import { createReducer, on } from '@ngrx/store';
import {
  UserBooking,
  UserStateInterface,
} from 'src/app/shared/models/user.model';
import { Nullable } from 'src/app/shared/models/types';
import { addBookingsToState, addUserToState } from '../actions/user.action';

export interface UserState {
  userDate: Nullable<UserStateInterface>;
  bookings: Array<UserBooking>;
}

const initialState: UserState = {
  userDate: null,
  bookings: [
    {
      id: 1,
      paid: false,
      bookingInfo: {
        roundTrip: true,
        departureAirport: 'ABZ',
        destinationAirport: 'GYD',
        departureDate: '2023-05-25',
        returnDate: '2023-05-27',
        passengers: {
          adult: 2,
          child: 1,
          infant: 0,
        },
      },
      flights: [
        {
          id: 5,
          flightNumber: 'SU-5288',
          departureAirport: 'ABZ',
          departureCity: 'Aberdeen',
          destinationAirport: 'GYD',
          destinationCity: 'Baku',
          departureDate: '2023-05-25',
          departureDateTime: '2023-05-25T09:00:00.000Z',
          destinationDateTime: '2023-05-25T11:00:00.000Z',
          durationMinutes: 120,
          flightFare: 128.5,
          tax: 12,
          luggageFare: 20,
          seats: 50,
          booked: 0,
        },
        {
          id: 1,
          flightNumber: 'SU-5289',
          departureAirport: 'GYD',
          departureCity: 'Baku',
          destinationAirport: 'ABZ',
          destinationCity: 'Aberdeen',
          departureDate: '2023-05-27',
          departureDateTime: '2023-05-27T15:00:00.000Z',
          destinationDateTime: '2023-05-27T17:00:00.000Z',
          durationMinutes: 120,
          flightFare: 100,
          tax: 30,
          luggageFare: 20,
          seats: 50,
          booked: 0,
        },
      ],
      passengers: null,
    },
  ],
};

export const UserReducer = createReducer(
  initialState,
  on(
    addUserToState,
    (state, { user }): UserState => ({
      userDate: user,
      bookings: state.bookings,
    })
  ),
  on(
    addBookingsToState,
    (state, { booking }): UserState => ({
      userDate: state.userDate,
      bookings: [...state.bookings, booking],
    })
  )
);
