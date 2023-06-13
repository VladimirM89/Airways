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

  private bookingInformation$ = new BehaviorSubject<Nullable<BookingInfo>>(
    null
  );

  private passengersInformation: Nullable<PassangersInfo> = null;

  private selectedFlights$ = new BehaviorSubject<SelectedFlights>({
    forwardFlight: null,
    returnFlight: null,
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

  public changeForwardDate(info: BookingInfo): void {
    this.bookingInformation$.next(info);
    this.deleteForwardFlight();
  }

  public changeReturnDate(info: BookingInfo): void {
    this.bookingInformation$.next(info);
    this.deleteReturnFlight();
  }

  public getCurrentBookingInfo(): Nullable<BookingInfo> {
    return this.bookingInformation$.getValue();
  }

  public get passengersInfo(): Nullable<PassangersInfo> {
    return this.passengersInformation;
  }

  public set passengersInfo(info: Nullable<PassangersInfo>) {
    this.passengersInformation = info;
  }

  public addForwardFlight(flight: Nullable<FlightItem>): void {
    const currentFlights = this.selectedFlights$.getValue();
    this.selectedFlights$.next({
      forwardFlight: flight,
      returnFlight: currentFlights?.returnFlight || null,
    });
  }

  public addReturnFlight(flight: Nullable<FlightItem>): void {
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

  public getCurrentSelectedFlights(): SelectedFlights {
    return this.selectedFlights$.getValue();
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
