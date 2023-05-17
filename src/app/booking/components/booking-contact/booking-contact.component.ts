import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ContactFormService } from 'src/app/shared/services/contact-form.service';
import { PassengersFormsService } from 'src/app/shared/services/passengers-forms.service';

@Component({
  selector: 'app-booking-contact',
  templateUrl: './booking-contact.component.html',
  styleUrls: ['./booking-contact.component.scss'],
  providers: [ContactFormService],
})
export class BookingContactComponent implements OnInit {
  public contactInputFormGroup!: FormGroup;

  public contactForm!: FormGroup;

  public constructor(
    private contactFormService: ContactFormService,
    private passengersFormsService: PassengersFormsService
  ) {}

  public ngOnInit(): void {
    this.contactForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      contactInput: this.contactFormService.contactFormGroup,
    });
    this.passengersFormsService.addForm(this.contactForm);
    this.passengersFormsService.passengersInfo(this.contactForm);
  }

  public get contactFormGroup(): FormGroup {
    return this.contactForm.get('contactInput') as FormGroup;
  }

  public get email(): AbstractControl<string> | null {
    return this.contactForm.get('email');
  }

  public get emailErrors(): ValidationErrors | undefined | null {
    return this.contactForm.get('email')?.errors;
  }
}
