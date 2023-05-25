import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingInfo, PassangersInfo } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/api-models';
import { Nullable } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingInformation$ = new BehaviorSubject<Nullable<BookingInfo>>({
    roundTrip: true,
    departureAirport: 'ABZ',
    destinationAirport: 'GYD',
    departureDate: '2023-05-25',
    returnDate: '2023-05-27',
    passengers: {
      adult: 2,
      child: 1,
      infant: 0,
    },
  });

  private passangersInfomation: Nullable<PassangersInfo> = null;

  private selectedFlights: Array<FlightItem> = [];

  public getBookingInfo(): Observable<Nullable<BookingInfo>> {
    return this.bookingInformation$.asObservable();
  }

  public setBookingInfo(info: Nullable<BookingInfo>): void {
    this.bookingInformation$.next(info);
  }

  public getCurrentBookingInfo(): Nullable<BookingInfo> {
    return this.bookingInformation$.getValue();
  }

  public get passengersInfo(): Nullable<PassangersInfo> {
    return this.passangersInfomation;
  }

  public set passengersInfo(info: Nullable<PassangersInfo>) {
    this.passangersInfomation = info;
  }

  public addFlight(flight: FlightItem): void {
    this.selectedFlights.push(flight);
  }

  public deleteFlight(flight: FlightItem): void {
    this.selectedFlights = this.selectedFlights.filter(
      item => item.id !== flight.id
    );
  }
}
