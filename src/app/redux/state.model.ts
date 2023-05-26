import { UserReducer, UserState } from './reducers/user.reducer';

export interface State {
  user: UserState;
}

export const AppReducers = {
  user: UserReducer,
};
