import { createAction, props } from '@ngrx/store';
import { FlightItem, SearchFlightsDto } from 'src/app/shared/models/api-models';

export const updateForwardFlights = createAction(
  '[FLIGHTS] Update current flights state',
  props<{ flights: FlightItem[] }>()
);

export const updateReturnFlights = createAction(
  '[FLIGHTS] Update current flights state',
  props<{ flights: FlightItem[] }>()
);

export const loadForwardFlights = createAction(
  '[FLIGHTS] Load flights from api',
  props<{ flightsDto: SearchFlightsDto }>()
);

export const loadReturnFlights = createAction(
  '[FLIGHTS] Load flights from api',
  props<{ flightsDto: SearchFlightsDto }>()
);
