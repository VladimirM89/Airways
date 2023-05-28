/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDuration',
})
export class FlightDurationPipe implements PipeTransform {
  public transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
