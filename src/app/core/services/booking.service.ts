import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingInfo, PassangersInfo } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Nullable } from 'src/app/shared/models/types';
import { UserBooking } from 'src/app/shared/models/user.model';

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

  private selectedFlights: Array<FlightItem> = [
    {
      id: 5,
      flightNumber: 'SU-5288',
      departureAirport: 'ABZ',
      departureCity: 'Aberdeen',
      destinationAirport: 'GYD',
      destinationCity: 'Baku',
      departureDate: '2023-06-19',
      departureDateTime: '2023-06-19T09:00:00.000Z',
      destinationDateTime: '2023-06-19T11:00:00.000Z',
      durationMinutes: 120,
      flightFare: 128.5,
      tax: 12,
      luggageFare: 20,
      seats: 50,
      booked: 0,
    },
    {
      id: 1,
      flightNumber: 'SU-5289',
      departureAirport: 'GYD',
      departureCity: 'Baku',
      destinationAirport: 'ABZ',
      destinationCity: 'Aberdeen',
      departureDate: '2023-06-25',
      departureDateTime: '2023-06-25T15:00:00.000Z',
      destinationDateTime: '2023-06-25T17:00:00.000Z',
      durationMinutes: 120,
      flightFare: 100,
      tax: 30,
      luggageFare: 20,
      seats: 50,
      booked: 0,
    },
  ];

  private userBookingsInfo: Array<UserBooking> = [
    {
      payed: false,
      bookingInfo: this.getCurrentBookingInfo()!,
      flight: this.flights,
      passengers: this.passengersInfo!,
    },
  ];

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

  public get flights(): FlightItem[] {
    return this.selectedFlights;
  }

  public get userBookings(): UserBooking[] {
    return this.userBookingsInfo;
  }

  public addUserBookings(info: UserBooking): void {
    this.userBookingsInfo.push(info);
  }

  public deleteUserBookings(info: UserBooking): void {
    this.userBookingsInfo = this.userBookingsInfo.filter(
      item => item.id !== info.id
    );
  }
}
