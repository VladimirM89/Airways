import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FLIGHTS_URL } from 'src/app/shared/constants/api-constants';
import { Observable } from 'rxjs';
import { FlightItem, SearchFlightsDto } from 'src/app/shared/models/api-models';

@Injectable({
  providedIn: 'root',
})
export class ApiFlightService {
  public constructor(private http: HttpClient) {}

  public getAllFlights(): Observable<FlightItem[]> {
    return this.http.get<FlightItem[]>(`${FLIGHTS_URL}/all`, {});
  }

  public getFlights(dto: SearchFlightsDto): Observable<FlightItem[]> {
    return this.http.get<FlightItem[]>(`${FLIGHTS_URL}`, {
      params: {
        departureAirport: dto.departureAirport,
        destinationAirport: dto.destinationAirport,
        departureDate: dto.date,
      },
    });
  }

  public getFlightById(id: number | string): Observable<FlightItem> {
    return this.http.get<FlightItem>(`${FLIGHTS_URL}/${id}`);
  }
}
