import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  BookingInfo,
  PassangersInfo,
  SelectedFlights,
} from 'src/app/shared/models/booking';
import { SearchFlightsDto } from 'src/app/shared/models/api-models';
import { Nullable } from 'src/app/shared/models/types';
import { Store } from '@ngrx/store';
import {
  loadForwardFlights,
  loadReturnFlights,
} from 'src/app/redux/actions/flights.actions';
import { FlightItem } from 'src/app/shared/models/flight-item';

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

  private selectedFlights$ = new BehaviorSubject<SelectedFlights>({
    forwardFlight: {
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
    returnFlight: {
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
  });

  public getBookingInfo(): Observable<Nullable<BookingInfo>> {
    return this.bookingInformation$.asObservable();
  }

  public setBookingInfo(info: Nullable<BookingInfo>): void {
    this.bookingInformation$.next(info);
    this.updateForwardFlightsState();
    this.updateReturnFlightsState();
    this.selectedFlights$.next({
      forwardFlight: null,
      returnFlight: null,
    });
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

  public addForwardFlight(flight: FlightItem): void {
    const currentFlights = this.selectedFlights$.getValue();
    this.selectedFlights$.next({
      forwardFlight: flight,
      returnFlight: currentFlights?.returnFlight || null,
    });
  }

  public addReturnFlight(flight: FlightItem): void {
    const currentFlights = this.selectedFlights$.getValue();
    this.selectedFlights$.next({
      forwardFlight: currentFlights?.forwardFlight || null,
      returnFlight: flight,
    });
  }

  public deleteForwardFlight(): void {
    const currentFlights = this.selectedFlights$.getValue();
    this.selectedFlights$.next({
      forwardFlight: null,
      returnFlight: currentFlights?.returnFlight || null,
    });
    this.updateForwardFlightsState();
  }

  public deleteReturnFlight(): void {
    const currentFlights = this.selectedFlights$.getValue();
    this.selectedFlights$.next({
      forwardFlight: currentFlights?.forwardFlight || null,
      returnFlight: null,
    });
    this.updateReturnFlightsState();
  }

  public getSelectedFlights(): Observable<SelectedFlights> {
    return this.selectedFlights$ as Observable<SelectedFlights>;
  }

  private updateForwardFlightsState(): void {
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
  }

  private updateReturnFlightsState(): void {
    const currentBookingInfo = this.bookingInformation$.getValue();
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
    this.selectedFlights$.next({
      forwardFlight: null,
      returnFlight: null,
    });
    this.passengersInfo = null;
  }
}
