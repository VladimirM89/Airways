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
    departureAirport: 'AMS',
    destinationAirport: 'GYD',
    departureDate: '2023-05-30',
    returnDate: '2023-05-31',
    passengers: {
      adult: 2,
      child: 1,
      infant: 0,
    },
  });

  private passangersInfomation: Nullable<PassangersInfo> = null;

  private selectedFlights: Array<FlightItem> = [
    {
      id: 1,
      flightNumber: 'SU-5288',
      departureAirport: 'GYD',
      departureCity: 'Baku',
      destinationAirport: 'IST',
      destinationCity: 'Istanbul',
      departureDate: '2023-05-27',
      departureDateTime: '2023-05-27T15:00:00.000Z',
      destinationDateTime: '2023-05-27T18:20:00.000Z',
      durationMinutes: 200,
      flightFare: 370,
      tax: 50,
      luggageFare: 35,
      seats: 150,
      booked: 0,
      direct: true,
      transferAirport: null,
      transferCity: null,
      transferDuration: null,
      transferFlightNumber: null,
    },
    {
      id: 30,
      flightNumber: 'SU-6022',
      departureAirport: 'SVO',
      departureCity: 'Moscow',
      destinationAirport: 'GYD',
      destinationCity: 'Baku',
      departureDate: '2023-06-02',
      departureDateTime: '2023-06-02T13:00:00.000Z',
      destinationDateTime: '2023-06-02T16:10:00.000Z',
      durationMinutes: 190,
      flightFare: 260,
      tax: 19,
      luggageFare: 25,
      seats: 140,
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
