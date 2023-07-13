/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { currencyFormats, dateFormats } from './constants/constants';
import { ProfileFormat } from './constants/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public dateFormats = dateFormats;

  public currencyFormats = currencyFormats;

  public dateControl = new FormControl(this.dateFormats[0].value);

  public formDate = new FormGroup({
    date: this.dateControl,
  });

  public currencyControl = new FormControl(this.currencyFormats[0].value);

  public formCurrency = new FormGroup({
    currency: this.currencyControl,
  });

  public trackByFn(index: number, item: ProfileFormat): number {
    return item.id;
  }
}
