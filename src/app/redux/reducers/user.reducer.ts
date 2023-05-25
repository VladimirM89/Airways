import { createReducer, on } from '@ngrx/store';
import { Nullable } from 'src/app/shared/models/types';
import { User } from 'src/app/shared/models/user.model';
import { addUserToState } from '../actions/user.action';

export interface UserState {
  userData: Nullable<User>;
}

const initialState: UserState = {
  userData: null,
};

export const UserReducer = createReducer(
  initialState,
  on(
    addUserToState,
    (state, { user }): UserState => ({
      ...state,
      userData: user,
    })
  )
);
