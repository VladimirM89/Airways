import { createAction, props } from '@ngrx/store';
import { UserBooking } from 'src/app/shared/models/user.model';

export const addBookingToState = createAction(
  '[Booking] Add booking to state',
  props<{ booking: UserBooking }>()
);
