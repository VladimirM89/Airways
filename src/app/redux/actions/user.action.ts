import { createAction, props } from '@ngrx/store';
import { RegistrationDto, User } from 'src/app/shared/models/user.model';

export const registerUser = createAction(
  '[User] Register user on server',
  props<{ user: RegistrationDto }>()
);

export const addUserToState = createAction(
  '[User] Add user to store',
  props<{ user: User }>()
);
