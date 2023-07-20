import { BookingInfo, PassangersInfo } from './booking';
import { FlightItem } from './flight-item';
import { Nullable } from './types';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  phone: string;
  citizenship: string | null;
}

export interface RegistrationDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  phone: string;
  citizenship?: string | null;
}

export interface UserToken {
  token: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
export interface UserBooking {
  id: number;
  paid: boolean;
  bookingInfo: BookingInfo;
  flights: Array<FlightItem>;
  passengers: Nullable<PassangersInfo>;
}
