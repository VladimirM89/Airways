import { FlightItem } from './flight-item';
import { Nullable } from './types';

export interface BookingInfo {
  roundTrip: boolean;
  departureAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate: string;
  passengers: PassengersNumber;
}

export interface PassengersNumber {
  adult: number;
  child: number;
  infant: number;
}

export interface PassangersInfo {
  adult: Array<Passenger>;
  child: Array<Passenger>;
  infant: Array<Passenger>;
  contacts: ContactInfo;
}

export interface ContactInfo {
  email: string;
  mobile: MobileInfo;
}

export interface MobileInfo {
  countryCode: string;
  number: string;
}

export interface Passenger {
  category?: string;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  specialAssistance: boolean;
  luggage: string;
}

export interface SelectedFlights {
  forwardFlight: Nullable<FlightItem>;
  returnFlight: Nullable<FlightItem>;
}

export interface FullBookingInfo {
  booking: BookingInfo;
  selected: SelectedFlights;
  passengers: PassangersInfo;
}
