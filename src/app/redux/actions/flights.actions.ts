import { createAction, props } from '@ngrx/store';
import { SearchFlightsDto } from 'src/app/shared/models/api-models';
import { FlightItem } from 'src/app/shared/models/flight-item';

export const updateForwardFlights = createAction(
  '[FLIGHTS] Update forward flights',
  props<{ flights: FlightItem[] }>()
);

export const updateReturnFlights = createAction(
  '[FLIGHTS] Update return flights',
  props<{ flights: FlightItem[] }>()
);

export const loadForwardFlights = createAction(
  '[FLIGHTS] Load forward flights from api',
  props<{ flightsDto: SearchFlightsDto }>()
);

export const loadReturnFlights = createAction(
  '[FLIGHTS] Load return flights from api',
  props<{ flightsDto: SearchFlightsDto }>()
);
