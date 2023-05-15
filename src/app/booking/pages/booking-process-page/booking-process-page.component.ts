/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import { DIAL_CODE_REGEXP } from 'src/app/shared/constants/string-constants';
import { Passenger } from 'src/app/shared/models/booking';
import { ContactFormService } from 'src/app/shared/services/contact-form.service';
import { ValidationFormsService } from 'src/app/shared/services/validation-forms.service';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
  providers: [ContactFormService],
})
export class BookingProcessPageComponent {
  public constructor(
    private router: Router,
    private validationFormsService: ValidationFormsService,
    private bookingService: BookingService,
    private contactFormService: ContactFormService
  ) {}

  public navToFlights(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public get isAllFormsValid(): boolean {
    return this.validationFormsService.formsArray.some(
      item => item.invalid === true
    );
  }

  public passengersInfo(): void {
    this.validationFormsService.formsObject?.adults.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      // console.log('adults', flatObj);
      this.bookingService.passengersInfo?.adults.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.child.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      // console.log('child', flatObj);
      this.bookingService.passengersInfo?.child.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.infants.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      // console.log('infants', flatObj);
      this.bookingService.passengersInfo?.infants.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.contacts.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      // console.log('contacts', flatObj);
      if (this.bookingService.passengersInfo?.contacts) {
        this.bookingService.passengersInfo.contacts.email = flatObj[
          'email'
        ] as string;
      }
      if (this.bookingService.passengersInfo?.contacts) {
        this.bookingService.passengersInfo.contacts.mobile =
          this.code(flatObj['countryCode'] as string) +
          (flatObj['number'] as string);
      }
    });
    console.log('passengersInfo', this.bookingService.passengersInfo);
  }

  private code(str: string): string {
    const code = str.match(DIAL_CODE_REGEXP);
    if (code) {
      return code[1].replace(' ', '');
    }
    return '';
  }
}
