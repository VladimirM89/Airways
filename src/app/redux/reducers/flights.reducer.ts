import { createReducer, on } from '@ngrx/store';
import { FlightItem } from 'src/app/shared/models/flight-item';
import {
  updateForwardFlights,
  updateReturnFlights,
} from '../actions/flights.actions';

export interface FlightsState {
  forwardFlights: Array<FlightItem>;
  returnFlights: Array<FlightItem>;
}

const initialState: FlightsState = {
  forwardFlights: [],
  returnFlights: [],
};

export const FlightsReducer = createReducer(
  initialState,
  on(
    updateForwardFlights,
    (state, { flights }): FlightsState => ({
      ...state,
      forwardFlights: flights,
    })
  ),
  on(
    updateReturnFlights,
    (state, { flights }): FlightsState => ({
      ...state,
      returnFlights: flights,
    })
  )
);
