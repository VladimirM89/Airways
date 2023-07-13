import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Nullable } from 'src/app/shared/models/types';
import { DateSliderItem } from '../models/date-slider.models';

@Directive({
  selector: '[appPriceColor]',
})
export class PriceColorDirective implements OnInit {
  @Input() public pricesForPeriod: DateSliderItem[] = [];

  @Input() public price: Nullable<number> = null;

  private green = 'rgba(33, 179, 30)';

  private red = 'rgba(179, 38, 30)';

  private yellow = 'rgba(241, 201, 51)';

  private primary = '#11397E';

  public constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    if (this.price && this.pricesForPeriod.length) {
      const notNullableValues = this.pricesForPeriod.filter(
        item => item.price !== null
      );
      const average =
        notNullableValues.reduce(
          (accum, next) => accum + (next.price ? next.price : 0),
          0
        ) / notNullableValues.length;

      if (this.price - average > 20) {
        this.setColor(this.red);
      } else if (this.price - average > 15) {
        this.setColor(this.yellow);
      } else if (average - this.price > 10) {
        this.setColor(this.green);
      } else {
        this.setColor(this.primary);
      }
    }
  }

  private setColor(color: string): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'color', color);
    this.renderer.setStyle(this.elRef.nativeElement, 'border-color', color);
  }
}
