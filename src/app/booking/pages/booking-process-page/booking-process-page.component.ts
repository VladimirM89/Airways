/* eslint-disable array-callback-return */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import {
  PassangersInfo,
  Passenger,
  MobileInfo,
} from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
import { PassengersFormsService } from 'src/app/shared/services/passengers-forms.service';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent {
  private passangersInfomation: Nullable<PassangersInfo> = {
    adult: [],
    child: [],
    infant: [],
    contacts: {
      email: '',
      mobile: {
        countryCode: '',
        number: '',
      },
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

  public get isAllFormsInvalid(): boolean {
    let isPassengersFormInvalid = true;
    if (
      this.passengersFormsService.formsArray &&
      this.passengersFormsService.contactForm
    ) {
      isPassengersFormInvalid = this.passengersFormsService.formsArray.some(
        item => item.invalid === true
      );
      return (
        isPassengersFormInvalid ||
        this.passengersFormsService.contactForm.invalid
      );
    }

    return true;
  }

  public setPassengersInfo(): void {
    if (
      this.passengersFormsService.passengerInfo &&
      this.passangersInfomation
    ) {
      this.addPassengerToService(
        this.passengersFormsService.passengerInfo?.adult,
        this.passangersInfomation?.adult
      );
      this.addPassengerToService(
        this.passengersFormsService.passengerInfo?.child,
        this.passangersInfomation?.child
      );
      this.addPassengerToService(
        this.passengersFormsService.passengerInfo?.infant,
        this.passangersInfomation?.infant
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
    this.passengersFormsService.passengerInfo?.contacts.map(item => {
      const flatObj = this.passengersFormsService.flattenObject(item.value);

      if (this.passangersInfomation?.contacts) {
        this.passangersInfomation.contacts.email = flatObj['email'] as string;

        this.passangersInfomation.contacts.mobile.countryCode = flatObj[
          'countryCode'
        ] as string;

        this.passangersInfomation.contacts.mobile.number = flatObj[
          'number'
        ] as string;
      }
    });
  }

  public navToPayment(): void {
    this.router.navigate([Paths.BOOKING, Paths.BOOKING_PAYMENT]);
  }

  public get contact(): MobileInfo | null {
    if (this.bookingService.passengersInfo) {
      return {
        countryCode:
          this.bookingService.passengersInfo?.contacts.mobile.countryCode,
        number: this.bookingService.passengersInfo?.contacts.mobile.number,
      };
    }
    return null;
  }
}
