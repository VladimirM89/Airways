import { Passenger } from './booking';
import { FlightItem } from './flight-item';

export interface BookingDto {
  token: string;
  paid: boolean;
  forwardFlightId: number;
  returnFlightId: number | null;
  passengers: Passenger[];
  contactInfo: ContactInfoDto;
}

export interface BookingItem {
  id: number;
  paid: boolean;
  forwardFlightId: number;
  returnFlightId: number;
  passengers: Passenger[];
  contactInfo: ContactInfoDto;
  forwardFlightData: FlightItem;
  returnFlightData: FlightItem | null;
}

export interface ContactInfoDto {
  email: string;
  countryCode: string;
  dialNumber?: string;
  number: string;
}

export interface DeleteBookingDto {
  id: number;
  token: string;
}

export interface SearchFlightsDto {
  departureAirport: string;
  destinationAirport: string;
  date: string;
}

export interface GetFligthsFareDto {
  departureAirport: string;
  destinationAirport: string;
  fromDate: string;
  toDate: string;
}

export interface FlightFare {
  date: string;
  flightFare: number;
}
