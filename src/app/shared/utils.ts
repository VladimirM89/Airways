import { UTC, UTC0Full, UTC0 } from './constants/city-utc';
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
    return `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`;
  }
  return '';
}

export function getLocalUTC(city: string): string {
  const cityData = UTC.find(
    item => item.city.toLowerCase() === city.toLowerCase()
  );
  return cityData ? cityData.utc : UTC0;
}

export function getFullUTC(city: string): string {
  const cityData = UTC.find(
    item => item.city.toLowerCase() === city.toLowerCase()
  );
  return cityData ? cityData.fullUtc : UTC0Full;
}

export function dateObjToString(date: Date): string {
  return date.toJSON().split('T')[0];
}
