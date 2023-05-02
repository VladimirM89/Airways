import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PassengersInfoService } from 'src/app/shared/services/passengers-info.service';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss'],
  providers: [PassengersInfoService],
})
export class BookingItemComponent implements OnInit {
  public passengersInfoInputForm!: FormGroup;

  public formGroup!: FormGroup;

  public constructor(private passengersInfoService: PassengersInfoService) {}

  public ngOnInit(): void {
    this.formGroup = this.passengersInfoService.passengersFormGroup;
  }

  public get passengerInfoFormGroup(): FormGroup {
    return this.formGroup as FormGroup;
  }
}
