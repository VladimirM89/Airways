import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SelectedBookingService } from 'src/app/core/services/selected-booking.service';
import { editBooking } from 'src/app/redux/actions/user.action';
import { selectUnpaidBookings } from 'src/app/redux/selectors/user.selectors';
import { UserBooking } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  public isPopupVisible = false;

  public sub!: Subscription;

  public constructor(
    private store: Store,
    private selectedBookingService: SelectedBookingService
  ) {}

  public get unpaidUserBookings$(): Observable<UserBooking[]> {
    return this.store.select(selectUnpaidBookings);
  }

  public get selectedCount(): number {
    return this.selectedBookingService.bookings.length;
  }

  public payBookings(): void {
    const array = this.selectedBookingService.bookings.slice();
    array.forEach(item => {
      const booking: UserBooking = {
        id: item.booking.id,
        paid: true,
        bookingInfo: item.booking.bookingInfo,
        flights: item.booking.flights,
        passengers: item.booking.passengers,
      };
      this.store.dispatch(editBooking({ booking }));
    });
    this.selectedBookingService.clearBookings();
    this.togglePopup();
  }

  public togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
