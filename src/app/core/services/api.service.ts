import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/shared/constants/api-constants';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private http: HttpClient) {}

  public getAllFlights(): Observable<any> {
    return this.http.get(`${BASE_URL}/flights/all`, {}).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  public getFlights(): Observable<any> {
    return this.http
      .get(`${BASE_URL}/flights`, {
        params: {
          departureAirport: 'ABZ',
          destinationAirport: 'GYD',
          departureDate: '2023-05-05',
        },
      })
      .pipe(
        tap(response => {
          console.log(response);
        })
      );
  }

  public registerUser(user: User): Observable<any> {
    return this.http.post(`${BASE_URL}/users`, user);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(`${BASE_URL}/users`);
  }
}
