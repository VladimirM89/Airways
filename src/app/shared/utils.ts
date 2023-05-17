import { DIAL_CODE_REGEXP } from './constants/string-constants';

export function dialCode(value: string): string {
  const code = value?.match(DIAL_CODE_REGEXP);
  if (code) {
    return code[1].replace(' ', '');
  }
  return '';
}

export function dateToString(date: Date | null): string {
  if (date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}/${`0${month}`.slice(-2)}/${day}`;
  }
  return '';
}
