import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PassengersInfoServiceService } from '../../services/passengers-info-service.service';

@Component({
  selector: 'app-passengers-info-form',
  templateUrl: './passengers-info-form.component.html',
  styleUrls: ['./passengers-info-form.component.scss'],
})
export class PassengersInfoFormComponent {
  @Input() public passengerFormGroup!: FormGroup;

  public constructor(
    public passengersInfoServiceService: PassengersInfoServiceService
  ) {}
}
