import { FlightsState, FlightsReducer } from './reducers/flights.reducer';
import { UserReducer, UserState } from './reducers/user.reducer';

export interface State {
  user: UserState;
  flights: FlightsState;
}

export const AppReducers = {
  user: UserReducer,
  flights: FlightsReducer,
};
