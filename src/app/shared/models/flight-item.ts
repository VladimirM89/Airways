import { Nullable } from './types';

export interface FlightItem {
  id: number;
  flightNumber: string;
  departureCity: string;
  departureAirport: string;
  destinationCity: string;
  destinationAirport: string;
  departureDate: string;
  departureDateTime: string;
  destinationDateTime: string;
  durationMinutes: number;
  flightFare: number;
  tax: number;
  luggageFare: number;
  seats: number;
  booked: number;
  direct: boolean;
  transferAirport: Nullable<string>;
  transferCity: Nullable<string>;
  transferDuration: Nullable<number>;
  transferFlightNumber: Nullable<string>;
}
