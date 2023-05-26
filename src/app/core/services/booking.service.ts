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

  private bookingInformation$ = new BehaviorSubject<Nullable<BookingInfo>>(
    null
  );

  private passangersInfomation: Nullable<PassangersInfo> = null;

  private selectedFlights: Array<FlightItem> = [];

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
}
