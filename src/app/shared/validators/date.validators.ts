import { FormControl } from '@angular/forms';

export default class DateValidators {
  public static isFutureDate(
    control: FormControl<Date>
  ): { [key: string]: boolean } | null {
    if (control.value) {
      const userDate = control.value.getTime();
      const currentDate = new Date().getTime();
      if (currentDate - userDate > 0) return null;
    }
    return { isFutureDate: true };
  }
}
