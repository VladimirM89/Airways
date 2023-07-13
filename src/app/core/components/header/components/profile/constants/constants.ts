import { ProfileFormat } from './types';

export const dateFormats: ProfileFormat[] = [
  { id: 1, value: 'MM/DD/YYYY', viewValue: 'MM/DD/YYYY' },
  { id: 2, value: 'DD/MM/YYYY', viewValue: 'DD/MM/YYYY' },
  { id: 3, value: 'YYYY/DD/MM', viewValue: 'YYYY/DD/MM' },
  { id: 4, value: 'YYYY/MM/DD', viewValue: 'YYYY/MM/DD' },
];

export const currencyFormats: ProfileFormat[] = [
  { id: 1, value: 'EUR', viewValue: 'EUR' },
  { id: 2, value: 'USD', viewValue: 'USD' },
  { id: 3, value: 'PLN', viewValue: 'PLN' },
  { id: 4, value: 'RUB', viewValue: 'RUB' },
];
