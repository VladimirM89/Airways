/* eslint-disable no-return-assign */
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Paths } from 'src/app/types/enums';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Observable } from 'rxjs';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
import { UserBooking } from '../../models/user.model';

interface ChoosenBookings {
  seleted: true;
  userBooking: UserBooking;
}

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss'],
})
export class BookingTableComponent implements OnInit {
  public selectedBookings: Array<ChoosenBookings> = [];

  @Input() public userBookings$!: Observable<UserBooking[]>;

  public isSmallScreen = window.innerWidth <= 540;

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    const smallScreen = (event.target as Window).innerWidth <= 540;
    if (smallScreen && !this.isSmallScreen) {
      this.isSmallScreen = true;
    }
    if (!smallScreen && this.isSmallScreen) {
      this.isSmallScreen = false;
    }
  }

  public isCartPage = false;

  public constructor(
    private router: Router,
    private paymentService: PaymentService,
    private selectedBookingService: SelectedBookingService
  ) {}

  public ngOnInit(): void {
    this.isCartPage = this.router.url === `/${Paths.CART}`;
  }

  public get isAllChecked(): boolean {
    return this.selectedBookingService.getCurrentAllSelectedValue();
  }

  public navToMain(): void {
    this.router.navigate([Paths.BASE]);
  }

  public summary(bookings: UserBooking[]): number {
    let sum = 0;
    bookings.forEach(
      item =>
        (sum += this.paymentService.summary(
          item.bookingInfo.passengers,
          item.flights
        ))
    );
    return sum;
  }

  public isAllBookingsSelected(bookings: UserBooking[]): void {
    this.selectedBookingService.changeAllSelectedValue();
    const isAllChecked =
      this.selectedBookingService.getCurrentAllSelectedValue();
    if (isAllChecked) {
      bookings.forEach(booking =>
        this.selectedBookingService.addBooking(isAllChecked, booking)
      );
    } else {
      this.selectedBookingService.clearBookings();
    }
  }
}
