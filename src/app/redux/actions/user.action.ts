/* eslint-disable import/no-extraneous-dependencies */
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const addUser = createAction(
  '[User] Register user',
  props<{ user: User }>()
);
