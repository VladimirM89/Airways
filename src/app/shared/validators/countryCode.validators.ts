import { FormControl } from '@angular/forms';
import { CountryCodes } from 'src/app/core/components/auth/components/register-form/constants/country-codes';

export default class CountryCodeValidators {
  public static isIncorrectValue(
    control: FormControl<string>
  ): { [key: string]: boolean } | null {
    let isCountryNameCorrect = null;

    if (control.value) {
      const CountryCodeArray = control.value.split('+');
      const dialCode = CountryCodeArray[CountryCodeArray.length - 1].slice(
        0,
        -1
      );
      const countryName = CountryCodeArray[0].slice(0, -2);
      isCountryNameCorrect = CountryCodes.find(
        item => item.name === countryName && item.dial_code === `+${dialCode}`
      );
    }
    return !isCountryNameCorrect ? { isIncorrectValue: true } : null;
  }
}
