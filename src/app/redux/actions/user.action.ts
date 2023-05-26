import { createAction, props } from '@ngrx/store';
import {
  User,
  UserBooking,
  UserStateInterface,
} from 'src/app/shared/models/user.model';

export const registerUser = createAction(
  '[User] Register user on server',
  props<{ user: User }>()
);

export const addUserToState = createAction(
  '[User] Add user to store',
  props<{ user: UserStateInterface }>()
);

export const addBookingToServer = createAction(
  '[Booking] Add booking to the server',
  props<{ booking: UserBooking }>
);

export const addBookingsToState = createAction(
  '[Booking] Add booking to state',
  props<{ booking: UserBooking }>()
);
