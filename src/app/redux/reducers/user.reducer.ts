import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from 'src/app/shared/models/user.model';
import { Nullable } from 'src/app/shared/models/types';
import { addUserToState } from '../actions/user.action';

export interface UserState {
  userData: Nullable<UserStateInterface>;
}

const initialState: UserState = {
  userData: null,
};

export const UserReducer = createReducer(
  initialState,
  on(
    addUserToState,
    (state, { user }): UserState => ({
      userData: user,
    })
  )
);
