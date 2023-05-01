import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BreadcrumbsPaths } from 'src/app/core/components/header/components/breadcrumps/constants/breadcrumbs-enum';
import { Subscription } from 'rxjs';
import { PassengersInfoService } from '../../services/passengers-info.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-passengers-info-form',
  templateUrl: './passengers-info-form.component.html',
  styleUrls: ['./passengers-info-form.component.scss'],
})
export class PassengersInfoFormComponent implements OnInit, OnDestroy {
  @Input() public passengerFormGroup!: FormGroup;

  public isBookingPage = false;

  public sub!: Subscription;

  public constructor(
    public passengersInfoService: PassengersInfoService,
    private routerService: RouterService
  ) {}

  public ngOnInit(): void {
    this.sub = this.routerService.checkUrl().subscribe(event => {
      const url = event.urlAfterRedirects;
      this.isBookingPage = url === BreadcrumbsPaths.BOOKING_PASSENGERS;
    });
  }

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

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
