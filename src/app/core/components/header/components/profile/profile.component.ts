import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ProfileFormat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public dateFormats: ProfileFormat[] = [
    { value: 'MM/DD/YYYY', viewValue: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', viewValue: 'DD/MM/YYYY' },
    { value: 'YYYY/DD/MM', viewValue: 'YYYY/DD/MM' },
    { value: 'YYYY/MM/DD', viewValue: 'YYYY/MM/DD' },
  ];

  public dateControl = new FormControl(this.dateFormats[0].value);

  public formDate = new FormGroup({
    date: this.dateControl,
  });

  public currencyFormats: ProfileFormat[] = [
    { value: 'EUR', viewValue: 'EUR' },
    { value: 'USD', viewValue: 'USD' },
    { value: 'PLN', viewValue: 'PLN' },
    { value: 'RUB', viewValue: 'RUB' },
  ];

  public currencyControl = new FormControl(this.currencyFormats[0].value);

  public formCurrency = new FormGroup({
    currency: this.currencyControl,
  });
}
