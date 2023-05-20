import { createAction, props } from '@ngrx/store';
import { User, UserStateInterface } from 'src/app/shared/models/user.model';

export const registerUser = createAction(
  '[User] Register user on server',
  props<{ user: User }>()
);

export const addUserToState = createAction(
  '[User] Add user to store',
  props<{ user: UserStateInterface }>()
);
