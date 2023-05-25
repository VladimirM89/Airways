import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

const selectUser = createFeatureSelector<UserState>('user');

export const selectUserDate = createSelector(
  selectUser,
  userState => userState.userDate
);
