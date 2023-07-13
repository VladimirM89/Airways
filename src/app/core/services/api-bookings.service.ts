import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOKING_URL } from 'src/app/shared/constants/api-constants';
import {
  BookingDto,
  BookingItem,
  DeleteBookingDto,
} from 'src/app/shared/models/api-models';

@Injectable({
  providedIn: 'root',
})
export class ApiBookingsService {
  public constructor(private http: HttpClient) {}

  public getAllBookings(token: string): Observable<BookingItem[]> {
    const params = new HttpParams().append('token', token);
    return this.http.get<BookingItem[]>(`${BOOKING_URL}`, {
      params,
    });
  }

  public addBooking(dto: BookingDto): Observable<BookingItem> {
    return this.http.post<BookingItem>(`${BOOKING_URL}`, dto);
  }

  public editBooking(
    id: number | string,
    dto: BookingDto
  ): Observable<BookingItem> {
    return this.http.patch<BookingItem>(`${BOOKING_URL}/${id}`, dto);
  }

  public deleteBooking(dto: DeleteBookingDto): Observable<[]> {
    const { token } = dto;
    const params = new HttpParams().append('token', token);
    return this.http.delete<[]>(`${BOOKING_URL}/${dto.id}`, {
      params,
    });
  }
}
