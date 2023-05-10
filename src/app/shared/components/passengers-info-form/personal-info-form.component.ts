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

  public get date(): AbstractControl<string> | null {
    return this.personalFormGroup.get('date');
  }

  public get dateErrors(): ValidationErrors | null | undefined {
    return this.personalFormGroup.get('date')?.errors;
  }

  public get isMale(): boolean {
    return this.personalInfoFormService.isMale;
  }

  public toggleGender(): void {
    this.personalInfoFormService.toggleGender();
  }
}
