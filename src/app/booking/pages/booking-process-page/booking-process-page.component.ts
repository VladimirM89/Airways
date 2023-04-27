import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PassengersInfoServiceService } from 'src/app/shared/services/passengers-info-service.service';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent implements OnInit {
  public form!: FormGroup;

  public constructor(
    private passengersInfoServiceService: PassengersInfoServiceService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      innerForm: this.passengersInfoServiceService.passengerInfoForm(),
    });
  }

  public get innerForm(): FormGroup {
    return this.form.get('innerForm') as FormGroup;
  }
}
