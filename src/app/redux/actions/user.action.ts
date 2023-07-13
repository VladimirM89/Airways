import { createAction, props } from '@ngrx/store';
import { BookingDto } from 'src/app/shared/models/api-models';
import {
  LoginDto,
  RegistrationDto,
  User,
  UserBooking,
} from 'src/app/shared/models/user.model';

export const registerUser = createAction(
  '[User] Register user on server',
  props<{ user: RegistrationDto }>()
);

export const addUserToState = createAction(
  '[User] Add user to store',
  props<{ user: User | null }>()
);

export const createBooking = createAction(
  '[Booking] Add booking to the server',
  props<{ booking: BookingDto }>()
);

export const addBookingToState = createAction(
  '[Booking] Add booking to state',
  props<{ booking: UserBooking }>()
);

export const loginUser = createAction(
  '[User] Login user',
  props<{ user: LoginDto }>()
);

export const logoutUser = createAction(
  '[User] Delete user from store',
  props<{ user: null }>()
);

export const updateBookingState = createAction(
  '[Booking] Add all bookings from server to state',
  props<{ bookings: UserBooking[] }>()
);

export const cancelAction = createAction('[User] Cancel action');

export const deleteBooking = createAction(
  '[Booking] Delete booking',
  props<{ booking: UserBooking }>()
);

export const editBooking = createAction(
  '[Booking] Edit booking',
  props<{ booking: UserBooking }>()
);

export const authGoogle = createAction(
  '[User] Auth with google',
  props<{ jwtCredentials: string }>()
);
