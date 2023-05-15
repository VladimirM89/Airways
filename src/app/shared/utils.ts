import { DIAL_CODE_REGEXP } from './constants/string-constants';

export function dialCode(value: string): string {
  const code = value?.match(DIAL_CODE_REGEXP);
  if (code) {
    return code[1].replace(' ', '');
  }
  return '';
}
