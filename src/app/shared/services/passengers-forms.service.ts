/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dateToString } from '../utils';

interface TempPassengers {
  adult: Array<FormGroup>;
  child: Array<FormGroup>;
  infant: Array<FormGroup>;
  contacts: Array<FormGroup>;
}

@Injectable({
  providedIn: 'root',
})
export class PassengersFormsService {
  public formsArray: FormGroup[] | null = null;

  public passengerInfo: TempPassengers | null = null;

  public createInitialPassengersInfo(): void {
    this.passengerInfo = {
      adult: [],
      child: [],
      infant: [],
      contacts: [],
    };
  }

  public createInitialPassengersArray(): void {
    this.formsArray = [];
  }

  public addForm(form: FormGroup): void {
    if (this.formsArray) {
      this.formsArray.push(form);
    }
  }

  public passengersInfo(form: FormGroup, passengerType?: string): void {
    if (passengerType === 'adult') {
      this.passengerInfo?.adult.push(form);
      return;
    }
    if (passengerType === 'child') {
      this.passengerInfo?.child.push(form);
      return;
    }
    if (passengerType === 'infant') {
      this.passengerInfo?.infant.push(form);
      return;
    }
    this.passengerInfo?.contacts.push(form);
  }

  public flattenObject(obj: { [key: string]: string | Date }): {
    [key: string]: string | Date;
  } {
    const flattened: { [key: string]: string | Date } = {};

    Object.keys(obj).forEach(key => {
      let value = obj[key];
      if (value instanceof Date) {
        value = value.toLocaleDateString();
      }
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(flattened, this.flattenObject(value));
      } else {
        if (key === 'dateOfBirth') {
          value = dateToString(obj[key] as Date);
        }
        flattened[key as keyof typeof flattened] = value;
      }
    });

    return flattened;
  }
}
