/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterService } from 'src/app/core/services/router.service';
import { Paths } from 'src/app/types/enums';
import { selectUserAuthBoolean } from 'src/app/redux/selectors/user.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public constructor(
    private routerService: RouterService,
    private store: Store
  ) {}

  public isMainPage = true;

  private subStyle!: Subscription;

  public isUserLoggedIn = this.store.select(selectUserAuthBoolean);

  public ngOnInit(): void {
    this.subStyle = this.routerService.checkUrl().subscribe(event => {
      const url = event.urlAfterRedirects;
      this.isMainPage = url === Paths.BASE;
    });
  }

  public ngOnDestroy(): void {
    this.subStyle.unsubscribe();
  }
}
