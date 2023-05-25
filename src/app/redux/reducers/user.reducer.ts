import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from 'src/app/shared/models/user.model';
import { Nullable } from 'src/app/shared/models/types';
import { addUserToState } from '../actions/user.action';

export interface UserState {
  userDate: Nullable<UserStateInterface>;
}

const initialState: UserState = {
  userDate: {
    id: 2,
    email: 'vms@mail.com',
    password: 'Aa!11111',
    firstName: 'Vladimir',
    lastName: 'Milashevsky',
    dateOfBirth: '08.06.1992',
    sex: 'male',
    pnone: '+375297739618',
    citizenship: 'Belarus',
  },
};

export const UserReducer = createReducer(
  initialState,
  on(
    addUserToState,
    (state, { user }): UserState => ({
      userDate: user,
    })
  )
);
