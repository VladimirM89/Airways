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
  mobile: string;
}

export interface PhoneInfo {
  countryCode: string;
  number: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  specialAssistance: boolean;
  luggage: string;
}
