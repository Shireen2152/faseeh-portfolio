import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' = 'fade-up';
  @Input() animationDelay = 0;
  @Input() animationThreshold = 0.15;

  private observer?: IntersectionObserver;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    element.classList.add('scroll-hidden');
    if (this.animationType !== 'fade-up') {
      element.classList.add(this.animationType);
    }
    if (this.animationDelay) {
      element.style.transitionDelay = `${this.animationDelay}s`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('scroll-visible');
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: this.animationThreshold }
    );

    this.observer.observe(element);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
