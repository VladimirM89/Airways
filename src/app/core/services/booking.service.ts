import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingInfo, PassangersInfo } from 'src/app/shared/models/booking';
import { FlightItem, SearchFlightsDto } from 'src/app/shared/models/api-models';
import { Nullable } from 'src/app/shared/models/types';
import { Store } from '@ngrx/store';
import {
  loadForwardFlights,
  loadReturnFlights,
} from 'src/app/redux/actions/flights.actions';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public constructor(private store: Store) {}

  private bookingInformation$ = new BehaviorSubject<Nullable<BookingInfo>>({
    roundTrip: true,
    departureAirport: 'GYD',
    destinationAirport: 'IST',
    departureDate: '2023-06-02',
    returnDate: '2023-06-08',
    passengers: {
      adult: 1,
      child: 0,
      infant: 0,
    },
  });

  private passangersInfomation: Nullable<PassangersInfo> = null;

  private selectedFlights: Array<FlightItem> = [
    {
      id: 50,
      flightNumber: 'SU-5288',
      departureAirport: 'ABZ',
      departureCity: 'Aberdeen',
      destinationAirport: 'GYD',
      destinationCity: 'Baku',
      departureDate: '2023-05-25',
      departureDateTime: '2023-05-25T09:00:00.000Z',
      destinationDateTime: '2023-05-25T11:00:00.000Z',
      durationMinutes: 120,
      flightFare: 128.5,
      tax: 12,
      luggageFare: 20,
      seats: 50,
      booked: 0,
      direct: true,
      transferAirport: null,
      transferCity: null,
      transferDuration: null,
      transferFlightNumber: null,
    },
    {
      id: 51,
      flightNumber: 'SU-5289',
      departureAirport: 'GYD',
      departureCity: 'Baku',
      destinationAirport: 'ABZ',
      destinationCity: 'Aberdeen',
      departureDate: '2023-05-27',
      departureDateTime: '2023-05-27T15:00:00.000Z',
      destinationDateTime: '2023-05-27T17:00:00.000Z',
      durationMinutes: 120,
      flightFare: 100,
      tax: 30,
      luggageFare: 20,
      seats: 50,
      booked: 0,
      direct: true,
      transferAirport: null,
      transferCity: null,
      transferDuration: null,
      transferFlightNumber: null,
    },
  ];

  public getBookingInfo(): Observable<Nullable<BookingInfo>> {
    return this.bookingInformation$.asObservable();
  }

  public setBookingInfo(info: Nullable<BookingInfo>): void {
    this.bookingInformation$.next(info);
    this.updateFlightsState();
    this.selectedFlights = [];
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

  public addSelectedFlight(flight: FlightItem): void {
    this.selectedFlights.push(flight);
  }

  private updateFlightsState(): void {
    const currentBookingInfo = this.bookingInformation$.getValue();
    if (currentBookingInfo) {
      const forwardFlightsData: SearchFlightsDto = {
        departureAirport: currentBookingInfo.departureAirport,
        destinationAirport: currentBookingInfo.destinationAirport,
        date: currentBookingInfo.departureDate,
      };
      this.store.dispatch(
        loadForwardFlights({
          flightsDto: forwardFlightsData,
        })
      );
    }
    if (currentBookingInfo && currentBookingInfo.roundTrip) {
      const returnFlightsData: SearchFlightsDto = {
        departureAirport: currentBookingInfo.destinationAirport,
        destinationAirport: currentBookingInfo.departureAirport,
        date: currentBookingInfo.returnDate,
      };
      this.store.dispatch(
        loadReturnFlights({
          flightsDto: returnFlightsData,
        })
      );
    }
  }

  public clearInfo(): void {
    this.bookingInformation$.next(null);
    this.selectedFlights = [];
    this.passengersInfo = null;
  }
}
