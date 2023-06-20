import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_URL } from 'src/app/shared/constants/api-constants';
import {
  LoginDto,
  RegistrationDto,
  User,
  UserToken,
} from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  public constructor(private http: HttpClient) {}

  public registerUser(dto: RegistrationDto): Observable<UserToken> {
    return this.http.post<UserToken>(`${AUTH_URL}/registration`, dto);
  }

  public loginUser(dto: LoginDto): Observable<UserToken> {
    return this.http.post<UserToken>(`${AUTH_URL}/login`, dto);
  }

  public getUser(token: string): Observable<User> {
    const params = new HttpParams().append('token', token);
    return this.http.get<User>(`${AUTH_URL}`, {
      params,
    });
  }

  public LoginWithGoogle(credentials: string): Observable<User> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<User>(
      `${AUTH_URL}/google`,
      JSON.stringify(credentials),
      {
        headers: header,
        withCredentials: true,
      }
    );
  }
}
