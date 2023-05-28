import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSeatsColor]',
})
export class SeatsColorDirective implements OnInit {
  @Input() public seats = 0;

  private green = 'rgba(33, 179, 30, 0.3)';

  private red = 'rgba(179, 38, 30, 0.3)';

  private yellow = 'rgba(241, 201, 51, 0.3)';

  public constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    if (this.seats <= 50) {
      this.setColor(this.red);
    } else if (this.seats <= 100) {
      this.setColor(this.yellow);
    } else {
      this.setColor(this.green);
    }
  }

  private setColor(color: string): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'padding', '.2rem .5rem');
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', color);
  }
}
