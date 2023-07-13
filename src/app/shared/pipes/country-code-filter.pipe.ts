/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { Pipe, PipeTransform } from '@angular/core';
import { CountryCode } from 'src/app/core/components/auth/components/register-form/constants/types';

@Pipe({
  name: 'countryCodeFilter',
})
export class CountryCodeFilterPipe implements PipeTransform {
  public transform(items: CountryCode[], searchText: string): CountryCode[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(code => {
      return (
        code.name.toLowerCase().includes(searchText) ||
        code.dial_code.includes(searchText)
      );
    });
  }
}
