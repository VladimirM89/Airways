/* eslint-disable import/no-extraneous-dependencies */
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import { BookingInfo } from 'src/app/shared/models/booking';
import { addUser } from '../actions/user.action';

export interface UserState {
  personalData: User[];
  bookings: BookingInfo[];
}

const initialState: UserState = {
  personalData: [],
  bookings: [],
};

export const UserReducer = createReducer(
  initialState,
  on(
    addUser,
    (state, { user }): UserState => ({
      ...state,
      personalData: [...state.personalData, user],
    })
  )
);
