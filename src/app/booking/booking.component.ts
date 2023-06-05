import { Component, HostListener, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnDestroy {
  public constructor(private localStorageService: LocalStorageService) {}

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): void {
    this.localStorageService.saveBookingToLocalStorage();
  }

  public ngOnDestroy(): void {
    this.localStorageService.deleteBookingFromLocalStorage();
  }
}
