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
  public passengersInfoForm!: FormGroup;

  public constructor(private passengersInfoService: PassengersInfoService) {}

  public ngOnInit(): void {
    this.passengersInfoForm = this.passengersInfoService.passengersFormGroup;
  }

  public get passengersInfoFormGroup(): FormGroup {
    return this.passengersInfoForm;
  }
}
