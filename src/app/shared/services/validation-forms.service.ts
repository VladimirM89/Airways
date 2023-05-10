import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationFormsService {
  public formsArray: FormGroup[] = [];

  public addForm(form: FormGroup): void {
    this.formsArray.push(form);
  }
}
