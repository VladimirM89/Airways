import { FormControl } from '@angular/forms';
import {
  CASE_CHECK_REGEXP,
  LETTERS_NUMBERS_CHECK_REGEXP,
  SPECIAL_SYMBOLS_CHECK_REGEXP,
} from '../constants/string-constants';

export default class PasswordValidators {
  public static checkStrongPassword(
    control: FormControl
  ): { [key: string]: string[] } | null {
    const errors = [];

    if (!(control.value.length >= 8)) {
      errors.push('at least 8 characters');
    }

    if (!control.value.match(CASE_CHECK_REGEXP)) {
      errors.push('a mixture of both uppercase and lowercase letters');
    }

    if (!control.value.match(LETTERS_NUMBERS_CHECK_REGEXP)) {
      errors.push('a mixture of letters and numbers');
    }

    if (!control.value.match(SPECIAL_SYMBOLS_CHECK_REGEXP)) {
      errors.push(
        'inclusion of at least one special character, e.g., ! @ # ? ]'
      );
    }
    return errors.length ? { checkStrongPassword: errors } : null;
  }
}
