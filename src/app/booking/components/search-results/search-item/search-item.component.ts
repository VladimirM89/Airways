import { Component, Input } from '@angular/core';
import { FlightItem } from 'src/app/shared/models/flight-item';
import { getLocalUTC, getFullUTC } from 'src/app/shared/utils';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() public flight!: FlightItem;

  @Input() public selected = false;

  public getFullUTC = getFullUTC;

  public getLocalUTC = getLocalUTC;
}
