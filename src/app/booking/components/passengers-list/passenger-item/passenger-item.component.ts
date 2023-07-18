/* eslint-disable class-methods-use-this */
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { INITIAL_BAGGAGE } from 'src/app/shared/constants/string-constants';
import { PersonalInfoFormService } from 'src/app/shared/services/personal-info-form.service';
import { PassengersFormsService } from 'src/app/shared/services/passengers-forms.service';
import { Passenger } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';

@Component({
  selector: 'app-passenger-item',
  templateUrl: './passenger-item.component.html',
  styleUrls: ['./passenger-item.component.scss'],
  providers: [PersonalInfoFormService],
})
export class PassengerItemComponent implements OnInit {
  @Input() public passengerCategory!: string;

  @Input() public index!: number;

  @Input() public passengerData!: Nullable<Passenger>;

  public personalFormGroup!: FormGroup;

  public passengerFormGroup!: FormGroup;

  public constructor(
    private personalInfoFormService: PersonalInfoFormService,
    private passengersFormsService: PassengersFormsService
  ) {}

  public ngOnInit(): void {
    this.passengerFormGroup = new FormGroup({
      personalFormGroup: this.personalInfoFormService.createPersonalInfoForm(
        this.passengerData,
        this.passengerCategory
      ),
      specialAssistance: new FormControl<boolean>(
        this.passengerData?.specialAssistance || false
      ),
      luggage: new FormControl<number>(
        Number(this.passengerData?.luggage) || INITIAL_BAGGAGE
      ),
    });

    this.passengersFormsService.updatePassengersFormArray(
      this.passengerFormGroup,
      this.passengerCategory
    );
  }

  public get passengersInfo(): FormGroup {
    return this.passengerFormGroup.get('personalFormGroup') as FormGroup;
  }

  public get specialAssistance(): AbstractControl | null {
    return this.passengerFormGroup.get('specialAssistance');
  }

  public get luggage(): FormControl<number> {
    return this.passengerFormGroup.get('luggage') as FormControl;
  }

  public get luggageValue(): number {
    return this.luggage?.value || 0;
  }

  public set luggageCount(value: number) {
    this.luggage?.setValue(value);
  }
}
