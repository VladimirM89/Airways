import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

const selectUser = createFeatureSelector<UserState>('user');

export const selectUserData = createSelector(
  selectUser,
  userState => userState.userData
);
