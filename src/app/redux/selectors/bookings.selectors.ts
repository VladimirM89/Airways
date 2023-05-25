import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from '../reducers/bookings.reducer';

const selectBookings = createFeatureSelector<BookingsState>('bookings');

export const selectAllBookings = createSelector(
  selectBookings,
  bookingsState => bookingsState.bookings
);

export const selectUnpaidBookings = createSelector(
  selectBookings,
  bookingsState => bookingsState.bookings.filter(item => item.paid === false)
);

export const selectPaidBookings = createSelector(
  selectBookings,
  bookingsState => bookingsState.bookings.filter(item => item.paid === true)
);
