import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Airports } from '../constants/airports';

export function checkIfFlightDirectionsDuplicate(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const depature = form.get('departure')?.value;
    const destination = form.get('destination')?.value;
    if (!depature || !destination) {
      return null;
    }
    if (depature === destination) {
      return { isDuplicate: 'departure and destination can not be the same' };
    }
    return null;
  };
}

export function checkIfFlightDirectionValid(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const airports = Airports;
    const foundAirport = airports.find(
      item => item.airportCode === control.value
    );
    if (!foundAirport) {
      return { isDirectionValid: 'select option from list' };
    }
    return null;
  };
}
