import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalInfoFormService } from 'src/app/shared/services/personal-info-form.service';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
  providers: [PersonalInfoFormService],
})
export class BookingItemComponent implements OnInit {
  public formGroup!: FormGroup;

  public constructor(
    private personalInfoFormService: PersonalInfoFormService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.personalInfoFormService.personalFormGroup;
  }

  public get passengerInfoFormGroup(): FormGroup {
    return this.formGroup as FormGroup;
  }
}
