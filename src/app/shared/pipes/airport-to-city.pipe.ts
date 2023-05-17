import { Pipe, PipeTransform } from '@angular/core';
import { Airports } from 'src/app/shared/constants/airports';

@Pipe({
  name: 'airportToCity',
})
export class AirportToCityPipe implements PipeTransform {
  private airports = Airports;

  public transform(code: string | undefined): string {
    if (code) {
      const airport = this.airports.find(
        item => item.airportCode.toLowerCase() === code.toLowerCase()
      );
      return airport ? airport.city : code;
    }
    return '';
  }
}
