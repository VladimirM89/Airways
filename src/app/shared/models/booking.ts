export interface BookingInfo {
  roundTrip: boolean;
  departureAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate: string;
  passengers: PassengersNumber;
}

export interface PassengersNumber {
  adults: number;
  child: number;
  infants: number;
}

export interface PassangersInfo {
  adults: Array<Passenger>;
  child: Array<Passenger>;
  infants: Array<Passenger>;
  contacts: ContactInfo;
}

export interface ContactInfo {
  email: string;
  mobile: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  specialAssistance: boolean;
  luggage: boolean;
}
