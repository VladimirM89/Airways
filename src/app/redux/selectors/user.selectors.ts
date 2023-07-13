import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

const selectUser = createFeatureSelector<UserState>('user');

export const selectUserDate = createSelector(
  selectUser,
  userState => userState.userDate
);

export const selectAllBookings = createSelector(
  selectUser,
  userState => userState.bookings
);

export const selectUnpaidBookings = createSelector(selectUser, userState =>
  userState.bookings.filter(item => item.paid === false)
);

export const selectPaidBookings = createSelector(selectUser, userState =>
  userState.bookings.filter(item => item.paid === true)
);

export const selectUserAuthBoolean = createSelector(
  selectUserDate,
  user => !!user
);
