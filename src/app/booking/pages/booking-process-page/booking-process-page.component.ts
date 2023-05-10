import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private validationFormsService: ValidationFormsService
  ) {}

  public navToFlights(): void {
    this.router.navigate([Paths.BOOKING]);
  }

  public get isAllFormsValid(): boolean {
    return this.validationFormsService.formsArray.some(
      item => item.invalid === true
    );
  }
}
