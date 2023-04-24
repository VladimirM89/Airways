/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Breadcrumbs } from 'src/app/core/components/header/components/breadcrumps/constants/breadcrumbs-constant';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss'],
})
export class BreadcrumpsComponent implements OnInit {
  public constructor(private router: Router) {}

  public breadcrumbs = Breadcrumbs;

  private activeIndex = -1;

  public isBookingPage = false;

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const { url } = event as RouterEvent;
        this.setActiveIndex(url);
        this.setBreadcrumbs();
      });
  }

  private setActiveIndex(url: string): void {
    this.breadcrumbs.map((item, index) => {
      if (item.url === url) {
        this.activeIndex = index;
        this.isBookingPage = true;
      }
    });
  }

  private setBreadcrumbs(): void {
    this.breadcrumbs.map((item, index) => {
      if (index < this.activeIndex) {
        item.isDone = true;
        item.isActive = false;
      }
      if (index === this.activeIndex) {
        item.isDone = false;
        item.isActive = true;
      }
      if (index > this.activeIndex) {
        item.isDone = false;
        item.isActive = false;
      }
    });
  }
}
