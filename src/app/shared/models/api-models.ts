import { ContactInfo, Passenger } from './booking';
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

export interface BookingDto {
  token: string;
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
  contactInfo: ContactInfo;
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
