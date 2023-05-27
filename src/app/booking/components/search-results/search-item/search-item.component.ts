import { Component, Input } from '@angular/core';
import { FlightItem } from 'src/app/shared/models/api-models';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() public flight!: FlightItem;
}
