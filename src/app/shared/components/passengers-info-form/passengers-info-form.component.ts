import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { PassengersInfoService } from '../../services/passengers-info.service';

@Component({
  selector: 'app-passengers-info-form',
  templateUrl: './passengers-info-form.component.html',
  styleUrls: ['./passengers-info-form.component.scss'],
})
export class PassengersInfoFormComponent {
  @Input() public passengerFormGroup!: FormGroup;

  public constructor(public passengersInfoService: PassengersInfoService) {}

  public get firstName(): AbstractControl<string> | null {
    return this.passengerFormGroup.get('firstName');
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.passengerFormGroup.get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.passengerFormGroup.get('lastName');
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.passengerFormGroup.get('lastName')?.errors;
  }

  public get date(): AbstractControl<string> | null {
    return this.passengerFormGroup.get('date');
  }

  public get dateErrors(): ValidationErrors | null | undefined {
    return this.passengerFormGroup.get('date')?.errors;
  }
}
