/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumbs } from 'src/app/core/components/header/components/breadcrumps/constants/breadcrumbs-constant';
import { RouterService } from 'src/app/core/services/router.service';
import { BreadcrumbInterface } from 'src/app/types/interfaces';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss'],
})
export class BreadcrumpsComponent implements OnInit, OnDestroy {
  public constructor(private routerService: RouterService) {}

  public breadcrumbs = Breadcrumbs;

  private activeIndex = -1;

  public isBookingPage = false;

  private subBreadcrumbs!: Subscription;

  public ngOnInit(): void {
    this.routerService.checkUrl().subscribe(event => {
      const url = event.urlAfterRedirects;
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
      if (!url.includes(Paths.BOOKING)) {
        this.isBookingPage = false;
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

  public trackByFn(index: number, item: BreadcrumbInterface): number {
    return item.id;
  }

  public ngOnDestroy(): void {
    this.subBreadcrumbs.unsubscribe();
  }
}
