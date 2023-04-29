import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PassengersInfoService } from 'src/app/shared/services/passengers-info.service';

@Component({
  selector: 'app-booking-process-page',
  templateUrl: './booking-process-page.component.html',
  styleUrls: ['./booking-process-page.component.scss'],
})
export class BookingProcessPageComponent implements OnInit {
  public passengersInfoForm!: FormGroup;

  public constructor(private passengersInfoService: PassengersInfoService) {}

  public ngOnInit(): void {
    this.passengersInfoForm = this.passengersInfoService.passengersFormGroup;
  }

  public get passengersInfoFormGroup(): FormGroup {
    return this.passengersInfoForm;
  }
}
