import { ProfileFormat } from './types';

export const dateFormats: ProfileFormat[] = [
  { value: 'MM/DD/YYYY', viewValue: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', viewValue: 'DD/MM/YYYY' },
  { value: 'YYYY/DD/MM', viewValue: 'YYYY/DD/MM' },
  { value: 'YYYY/MM/DD', viewValue: 'YYYY/MM/DD' },
];

export const currencyFormats: ProfileFormat[] = [
  { value: 'EUR', viewValue: 'EUR' },
  { value: 'USD', viewValue: 'USD' },
  { value: 'PLN', viewValue: 'PLN' },
  { value: 'RUB', viewValue: 'RUB' },
];
