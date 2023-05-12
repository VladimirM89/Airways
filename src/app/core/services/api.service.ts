import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/shared/constants/api-constants';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { FlightItem } from 'src/app/shared/models/flight-item';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private http: HttpClient) {}

  public getAllFlights(): Observable<FlightItem[]> {
    return this.http.get<FlightItem[]>(`${BASE_URL}/flights/all`, {});
  }

  public getFlights(
    departure: string,
    destination: string,
    date: string
  ): Observable<FlightItem[]> {
    return this.http.get<FlightItem[]>(`${BASE_URL}/flights`, {
      params: {
        departureAirport: departure,
        destinationAirport: destination,
        departureDate: date,
      },
    });
  }

  public generateFlights(from: string, to: string): Observable<FlightItem[]> {
    return this.http.post<FlightItem[]>(`${BASE_URL}/flights`, {
      fromDate: from,
      toDate: to,
    });
  }

  public registerUser(user: User): Observable<any> {
    return this.http.post(`${BASE_URL}/users`, user);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${BASE_URL}/users`);
  }
}
