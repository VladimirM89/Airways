import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDuration'
})
export class FlightDurationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
