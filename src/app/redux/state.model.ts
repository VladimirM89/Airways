import { BookingReducer, BookingsState } from './reducers/bookings.reducer';
import { UserReducer, UserState } from './reducers/user.reducer';

export interface State {
  user: UserState;
  bookings: BookingsState;
}

export const AppReducers = {
  user: UserReducer,
  bookings: BookingReducer,
};
