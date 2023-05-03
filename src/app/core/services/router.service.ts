import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public constructor(private router: Router) {}

  public checkUrl(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    );
  }
}
