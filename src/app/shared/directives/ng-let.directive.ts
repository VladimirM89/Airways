/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  appNgLet: T | null;
}

@Directive({
  selector: '[appNgLet]',
})
export class NgLetDirective<T> {
  private context: LetContext<T> = { appNgLet: null };

  public constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set appNgLet(value: T) {
    this.context.appNgLet = value;
  }
}
