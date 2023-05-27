import { createReducer, on } from '@ngrx/store';
import { UserBooking, User } from 'src/app/shared/models/user.model';
import { Nullable } from 'src/app/shared/models/types';
import {
  logoutUser,
  addBookingToState,
  addUserToState,
} from '../actions/user.action';

export interface UserState {
  userDate: Nullable<User>;
  bookings: Array<UserBooking>;
}

const initialState: UserState = {
  userDate: null,
  bookings: [],
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
    addBookingToState,
    (state, { booking }): UserState => ({
      ...state,
      bookings: [...state.bookings, booking],
    })
  ),
  on(
    logoutUser,
    (state, { user }): UserState => ({
      userDate: user,
      bookings: [],
    })
  )
);
