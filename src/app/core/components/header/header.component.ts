import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterService } from 'src/app/core/services/router.service';
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
      this.isMainPage = url === Paths.BASE;
    });
  }

  public ngOnDestroy(): void {
    this.subStyle.unsubscribe();
  }
}
