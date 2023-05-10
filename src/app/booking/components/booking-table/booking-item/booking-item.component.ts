/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalInfoFormService } from 'src/app/shared/services/personal-info-form.service';
import { ValidationFormsService } from 'src/app/shared/services/validation-forms.service';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
  providers: [PersonalInfoFormService],
})
export class BookingItemComponent implements OnInit {
  public formGroup!: FormGroup;

  public constructor(
    private personalInfoFormService: PersonalInfoFormService,
    private validationFormsService: ValidationFormsService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.personalInfoFormService.personalFormGroup;
    this.validationFormsService.addForm(this.formGroup);
  }

  public get passengerInfoFormGroup(): FormGroup {
    return this.formGroup as FormGroup;
  }
}
