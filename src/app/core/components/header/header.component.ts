/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterService } from 'src/app/shared/services/router.service';
import { Paths } from 'src/app/types/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isMainPage = true;

  private subStyle!: Subscription;

  public constructor(private routerService: RouterService) {}

  public ngOnInit(): void {
    this.subStyle = this.routerService.checkUrl().subscribe(event => {
      const url = event.urlAfterRedirects;
      this.setHeaderStyle(url);
    });
  }

  private setHeaderStyle(url: string): void {
    url === Paths.BASE ? (this.isMainPage = true) : (this.isMainPage = false);
  }

  public ngOnDestroy(): void {
    this.subStyle.unsubscribe();
  }
}
