import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { PersonalInfoFormService } from '../../services/personal-info-form.service';

@Component({
  selector: 'app-passengers-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent {
  @Input() public personalFormGroup!: FormGroup;

  public constructor(
    private personalInfoFormService: PersonalInfoFormService
  ) {}

  public get firstName(): AbstractControl<string> | null {
    return this.personalFormGroup.get('firstName');
  }

  public get firstNameErrors(): ValidationErrors | undefined | null {
    return this.personalFormGroup.get('firstName')?.errors;
  }

  public get lastName(): AbstractControl<string> | null {
    return this.personalFormGroup.get('lastName');
  }

  public get lastNameErrors(): ValidationErrors | undefined | null {
    return this.personalFormGroup.get('lastName')?.errors;
  }

  public get dateOfBirth(): AbstractControl<string> | null {
    return this.personalFormGroup.get('dateOfBirth');
  }

  public get dateOfBirthErrors(): ValidationErrors | null | undefined {
    return this.personalFormGroup.get('dateOfBirth')?.errors;
  }

  public get sex(): AbstractControl<boolean> | null {
    return this.personalFormGroup.get('sex');
  }

  public get isMale(): boolean | null {
    if (this.personalInfoFormService.isMale) {
      return this.personalInfoFormService?.isMale;
    }
    return null;
  }

  public toggleGender(): void {
    this.personalInfoFormService.toggleGender();
  }
}
