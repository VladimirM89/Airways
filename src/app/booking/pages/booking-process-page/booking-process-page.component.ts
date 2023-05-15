import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/core/services/booking.service';
import { Passenger } from 'src/app/shared/models/booking';
import { ValidationFormsService } from 'src/app/shared/services/validation-forms.service';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent {
  public constructor(
    private router: Router,
    private validationFormsService: ValidationFormsService,
    private bookingService: BookingService
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
      console.log('adults', flatObj);
      this.bookingService.passengersInfo?.adults.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.child.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      console.log('child', flatObj);
      this.bookingService.passengersInfo?.child.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.infants.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      console.log('infants', flatObj);
      this.bookingService.passengersInfo?.infants.push(
        flatObj as unknown as Passenger
      );
    });
    this.validationFormsService.formsObject?.contacts.map(item => {
      const flatObj = this.validationFormsService.flattenObject(item.value);
      console.log('contacts', flatObj);
    });
    console.log('passengersInfo', this.bookingService.passengersInfo);
  }
}
