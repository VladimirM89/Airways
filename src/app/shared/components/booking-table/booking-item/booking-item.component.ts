import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { FlightItem } from 'src/app/shared/models/api-models';
import { PassengersNumber } from 'src/app/shared/models/booking';

import { UserBooking } from 'src/app/shared/models/user.model';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
})
export class BookingItemComponent {
  @Input() public booking!: UserBooking;

  public constructor(
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  public get departureAirport(): string {
    return this.booking.bookingInfo.departureAirport;
  }

  public get destinationAirport(): string {
    return this.booking.bookingInfo.destinationAirport;
  }

  private getFlight(airport: string): FlightItem | null {
    const flight = this.booking.flights.find(
      item => item.departureAirport === airport
    );
    return flight || null;
  }

  public get flightNumber(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight?.flightNumber || '';
  }

  public get returnflightNumber(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight?.flightNumber || '';
  }

  public get roundTrip(): boolean {
    return this.booking.bookingInfo.roundTrip;
  }

  public get departureDate(): string {
    return this.booking.bookingInfo.departureDate;
  }

  public get departureTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight ? flight.departureDateTime : '';
  }

  public get destinationTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.departureAirport);
    return flight ? flight.destinationDateTime : '';
  }

  public get departureBackDate(): string {
    return this.booking.bookingInfo.returnDate;
  }

  public get departureBackTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight ? flight.departureDateTime : '';
  }

  public get destinationBackTime(): string {
    const flight = this.getFlight(this.booking.bookingInfo.destinationAirport);
    return flight ? flight.destinationDateTime : '';
  }

  public get passengers(): PassengersNumber {
    return this.booking.bookingInfo.passengers;
  }

  public get cost(): number {
    return this.paymentService.summary(
      this.booking.bookingInfo,
      this.booking.flights
    );
  }

  public get isNotPayed(): boolean {
    return !this.booking.paid;
  }

  // TODO: change to delete from server and store
  public deleteBooking(booking: UserBooking): void {
    // this.bookingService.deleteUserBooking(booking);
    console.log('booking to delete: ', booking);
  }

  public editInfo(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PASSENGERS]);
  }
}
