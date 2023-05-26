import { createAction, props } from '@ngrx/store';
import { BookingDto } from 'src/app/shared/models/api-models';
import {
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
  props<{ user: User }>()
);

export const addBookingToServer = createAction(
  '[Booking] Add booking to the server',
  props<{ booking: BookingDto }>()
);

export const addBookingsToState = createAction(
  '[Booking] Add booking to state',
  props<{ booking: UserBooking }>()
);
