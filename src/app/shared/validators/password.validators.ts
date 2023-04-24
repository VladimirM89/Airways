import { FormControl } from '@angular/forms';

export default class PasswordValidators {
  public static checkStrongPassword(
    control: FormControl
  ): { [key: string]: string[] } | null {
    const errors = [];

    if (!(control.value.length >= 8)) {
      errors.push('at least 8 characters');
    }

    if (!control.value.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
      errors.push('a mixture of both uppercase and lowercase letters');
    }

    if (!control.value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      errors.push('a mixture of letters and numbers');
    }

    if (!control.value.match(/(?=.*\W)/)) {
      errors.push(
        'inclusion of at least one special character, e.g., ! @ # ? ]'
      );
    }
    return errors.length ? { checkStrongPassword: errors } : null;
  }
}
