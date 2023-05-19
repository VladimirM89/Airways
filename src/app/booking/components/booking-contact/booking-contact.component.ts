import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BookingService } from 'src/app/core/services/booking.service';
import { MobileInfo } from 'src/app/shared/models/booking';
import { Nullable } from 'src/app/shared/models/types';
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

  @Input() public contactData!: Nullable<MobileInfo>;

  public constructor(
    private contactFormService: ContactFormService,
    private passengersFormsService: PassengersFormsService,
    private bookingService: BookingService
  ) {}

  public ngOnInit(): void {
    this.passengersFormsService.createInitialContactInfo();
    this.contactForm = new FormGroup({
      email: new FormControl<string>(
        this.bookingService.passengersInfo?.contacts.email || '',
        [Validators.email, Validators.required]
      ),
      contactInput: this.contactFormService.createContactForm(this.contactData),
    });
    this.passengersFormsService.contactForm = this.contactForm;

    this.passengersFormsService.updatePassengersFormArray(this.contactForm);
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
