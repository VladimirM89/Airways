import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactFormService } from 'src/app/shared/services/contact-form.service';

@Component({
  selector: 'app-booking-contact',
  templateUrl: './booking-contact.component.html',
  styleUrls: ['./booking-contact.component.scss'],
  providers: [ContactFormService],
})
export class BookingContactComponent implements OnInit {
  public contactInputFormGroup!: FormGroup;

  public constructor(private contactFormService: ContactFormService) {}

  public ngOnInit(): void {
    this.contactInputFormGroup = this.contactFormService.contactFormGroup;
  }

  public get contactFormGroup(): FormGroup {
    return this.contactInputFormGroup;
  }
}
