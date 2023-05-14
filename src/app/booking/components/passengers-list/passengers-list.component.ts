/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss'],
})
export class PassengersListComponent {
  // TODO: items - get number of passengers from passengersInfo
  public items = ['adult', 'child', 'infants'];

  public trackByFn(index: number, item: string): string {
    return item;
  }
}
