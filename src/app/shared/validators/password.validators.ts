import { FormControl } from '@angular/forms';
import {
  CASE_CHECK_REGEXP,
  LETTERS_NUMBERS_CHECK_REGEXP,
  MINIMUM_LENGHT_TEXT,
  MIX_CASES_TEXT,
  MIX_LETTERS_NUMBERS_TEXT,
  SPECIAL_SYMBOLS_CHECK_REGEXP,
  SPECIAL_SYMBOLS_TEXT,
} from '../constants/string-constants';

export default class PasswordValidators {
  public static checkStrongPassword(
    control: FormControl
  ): { [key: string]: string[] } | null {
    const errors = [];

    if (control.value) {
      if (!(control.value.length >= 8)) {
        errors.push(MINIMUM_LENGHT_TEXT);
      }

      if (!control.value.match(CASE_CHECK_REGEXP)) {
        errors.push(MIX_CASES_TEXT);
      }

      if (!control.value.match(LETTERS_NUMBERS_CHECK_REGEXP)) {
        errors.push(MIX_LETTERS_NUMBERS_TEXT);
      }

      if (!control.value.match(SPECIAL_SYMBOLS_CHECK_REGEXP)) {
        errors.push(SPECIAL_SYMBOLS_TEXT);
      }
    }

    return errors.length ? { checkStrongPassword: errors } : null;
  }
}
