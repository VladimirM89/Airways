import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  public constructor(private router: Router) {}

  public navToMain(): void {
    this.router.navigate(['']);
  }
}
