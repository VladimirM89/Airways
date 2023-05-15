/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Pass {
  adults: Array<FormGroup>;
  child: Array<FormGroup>;
  infants: Array<FormGroup>;
  contacts: Array<FormGroup>;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationFormsService {
  public formsArray: FormGroup[] = [];

  public formsObject: Pass | null = {
    adults: [],
    child: [],
    infants: [],
    contacts: [],
  };

  public addForm(form: FormGroup): void {
    this.formsArray.push(form);
  }

  public passengerInfo(form: FormGroup, passengerType?: string): void {
    if (passengerType === 'adult') {
      this.formsObject?.adults.push(form);
      // console.log('adults', this.formsObject?.adults);
      // if (form instanceof Object) {
      //   this.formsObject?.adults.push(Object.values(form as object));
      // }
      return;
    }
    if (passengerType === 'child') {
      this.formsObject?.child.push(form);
      // console.log('child', this.formsObject?.child);
      return;
    }
    if (passengerType === 'infant') {
      this.formsObject?.infants.push(form);
      // console.log('infants', this.formsObject?.infants);
      return;
    }
    this.formsObject?.contacts.push(form);
    // console.log('contacts', this.formsObject?.contacts);
  }

  public flattenObject(obj: { [key: string]: string | Date }): {
    [key: string]: string | Date;
  } {
    // console.log('flat object: ', obj);
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
        flattened[key as keyof typeof flattened] = value;
      }
    });

    return flattened;
  }
}
