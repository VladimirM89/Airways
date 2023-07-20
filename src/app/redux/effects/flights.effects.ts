import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiFlightService } from 'src/app/core/services/api-flight.service';
import {
  loadForwardFlights,
  loadReturnFlights,
  updateForwardFlights,
  updateReturnFlights,
} from '../actions/flights.actions';

@Injectable()
export class FlightsEffects {
  public constructor(
    private actions$: Actions,
    private apiFlightsService: ApiFlightService
  ) {}

  private updateForwardFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadForwardFlights),
      switchMap(action =>
        this.apiFlightsService
          .getFlights(action.flightsDto)
          .pipe(map(flights => updateForwardFlights({ flights })))
      )
    );
  });

  private updateReturnFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReturnFlights),
      switchMap(action =>
        this.apiFlightsService
          .getFlights(action.flightsDto)
          .pipe(map(flights => updateReturnFlights({ flights })))
      )
    );
  });
}
