/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { Airport } from '../models/airport';

@Pipe({
  name: 'airportFilterPipe',
})
export class AirportFilterPipe implements PipeTransform {
  public transform(items: Airport[], searchText: string): Airport[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter(airport => {
      return (
        airport.airportCode.toLowerCase().includes(searchText.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
}
