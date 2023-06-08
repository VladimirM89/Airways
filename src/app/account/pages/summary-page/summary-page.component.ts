import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public constructor(private router: Router) {}

  public navToAccount(): void {
    this.router.navigate([Paths.ACCOUNT]);
  }
}
