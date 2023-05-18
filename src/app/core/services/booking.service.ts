import { Injectable } from '@angular/core';
import { BookingInfo, PassangersInfo } from 'src/app/shared/models/booking';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { Nullable } from 'src/app/shared/models/types';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  // private bookingInformation: Nullable<BookingInfo> = null;
  private bookingInformation: Nullable<BookingInfo> = {
    roundTrip: true,
    departureAirport: 'ABZ',
    destinationAirport: 'GYD',
    departureDate: '2023-05-15',
    returnDate: '2023-05-20',
    passengers: {
      adult: 2,
      child: 0,
      infant: 0,
    },
  };

  private passangersInfomation: Nullable<PassangersInfo> = null;

  private selectedFlights: Array<FlightItem> = [
    {
      id: 5,
      flightNumber: 'SU-5288',
      departureAirport: 'MSK',
      departureCity: 'Minsk',
      destinationAirport: 'KLD',
      destinationCity: 'Kaliningrad',
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
      departureAirport: 'KLD',
      departureCity: 'Kaliningrad',
      destinationAirport: 'MSK',
      destinationCity: 'Minsk',
      departureDate: '2023-06-25',
      departureDateTime: '2023-06-25T15:00:00.000Z',
      destinationDateTime: '2023-06-25T17:00:00.000Z',
      durationMinutes: 120,
      flightFare: 128.5,
      tax: 12,
      luggageFare: 20,
      seats: 50,
      booked: 0,
    },
  ];

  public get bookingInfo(): Nullable<BookingInfo> {
    return this.bookingInformation;
  }

  public set bookingInfo(info: Nullable<BookingInfo>) {
    this.bookingInformation = info;
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

  public get passengersNumber(): number {
    if (this.bookingInformation) {
      return (
        this.bookingInformation.passengers.adult +
        this.bookingInformation.passengers.child +
        this.bookingInformation.passengers.infant
      );
    }
    return 0;
  }

  public get flights(): FlightItem[] {
    return this.selectedFlights;
  }
}
