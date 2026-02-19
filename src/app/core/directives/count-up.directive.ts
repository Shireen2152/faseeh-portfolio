import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') targetValue = 0;
  @Input() countDuration = 2000;
  @Input() countSuffix = '';

  private observer?: IntersectionObserver;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    element.textContent = '0' + this.countSuffix;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCount(element);
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(element);
  }

  private animateCount(element: HTMLElement) {
    const start = performance.now();
    const isDecimal = this.targetValue % 1 !== 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / this.countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = this.targetValue * eased;

      element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + this.countSuffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
