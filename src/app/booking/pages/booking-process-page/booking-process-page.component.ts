/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
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
export class BookingProcessPageComponent implements OnInit {
  private passangersInfomation: Nullable<PassangersInfo> = {
    adult: [],
    child: [],
    infant: [],
    contacts: {
      email: '',
      mobile: '',
    },
  };

  public ngOnInit(): void {
    this.passengersFormsService.createInitialPassengersInfo();
    this.passengersFormsService.createInitialPassengersArray();
  }

  public constructor(
    private router: Router,
    private passengersFormsService: PassengersFormsService,
    private bookingService: BookingService
  ) {}

  public navToFlights(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public get isAllFormsValid(): boolean | null {
    if (this.passengersFormsService.formsArray) {
      return this.passengersFormsService.formsArray.some(
        item => item.invalid === true
      );
    }
    return false;
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
