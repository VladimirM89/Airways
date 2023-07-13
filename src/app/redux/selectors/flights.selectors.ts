import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState } from '../reducers/flights.reducer';

const selectFlights = createFeatureSelector<FlightsState>('flights');

export const selectForwardFligths = createSelector(
  selectFlights,
  flightsState => flightsState.forwardFlights
);

export const selectReturnFligths = createSelector(
  selectFlights,
  flightsState => flightsState.returnFlights
);
