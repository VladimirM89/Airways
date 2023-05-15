/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import { PassangersInfo, Passenger } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { PassengersFormsService } from 'src/app/shared/services/passengers-forms.service';
import { dialCode } from 'src/app/shared/utils';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent {
  private passangersInfomation: Nullable<PassangersInfo> = {
    adults: [],
    child: [],
    infants: [],
    contacts: {
      email: '',
      mobile: '',
    },
  };

  public constructor(
    private router: Router,
    private passengersFormsService: PassengersFormsService,
    private bookingService: BookingService
  ) {}

  public navToFlights(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public get isAllFormsValid(): boolean {
    return this.passengersFormsService.formsArray.some(
      item => item.invalid === true
    );
  }

  public passengersInfo(): void {
    if (this.passengersFormsService.formsObject && this.passangersInfomation) {
      this.addPassengerToService(
        this.passengersFormsService.formsObject?.adults,
        this.passangersInfomation?.adults
      );
      this.addPassengerToService(
        this.passengersFormsService.formsObject?.child,
        this.passangersInfomation?.child
      );
      this.addPassengerToService(
        this.passengersFormsService.formsObject?.infants,
        this.passangersInfomation?.infants
      );
    }

    this.addContactsToService();

    this.bookingService.passengersInfo = this.passangersInfomation;

    this.navToPayment();
  }

  private addPassengerToService(
    sourceForm: Array<FormGroup>,
    resultForm: Array<Passenger>
  ): void {
    sourceForm.map(item => {
      const flatObj = this.passengersFormsService.flattenObject(item.value);

      resultForm.push(flatObj as unknown as Passenger);
    });
  }

  private addContactsToService(): void {
    this.passengersFormsService.formsObject?.contacts.map(item => {
      const flatObj = this.passengersFormsService.flattenObject(item.value);

      if (this.passangersInfomation?.contacts) {
        this.passangersInfomation.contacts.email = flatObj['email'] as string;

        this.passangersInfomation.contacts.mobile =
          dialCode(flatObj['countryCode'] as string) +
          (flatObj['number'] as string);
      }
    });
  }

  public navToPayment(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PAYMENT]);
  }
}
