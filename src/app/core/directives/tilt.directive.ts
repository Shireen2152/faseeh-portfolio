import { Directive, ElementRef, OnInit, OnDestroy, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private isTouchDevice = false;
  private boundMove?: (e: MouseEvent) => void;
  private boundLeave?: () => void;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (this.isTouchDevice) return;

    const element = this.el.nativeElement as HTMLElement;
    element.style.transition = 'transform 0.15s ease-out';
    element.style.transformStyle = 'preserve-3d';

    this.boundMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    };

    this.boundLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    };

    this.zone.runOutsideAngular(() => {
      element.addEventListener('mousemove', this.boundMove!);
      element.addEventListener('mouseleave', this.boundLeave!);
    });
  }

  ngOnDestroy() {
    if (this.isTouchDevice) return;
    const element = this.el.nativeElement as HTMLElement;
    if (this.boundMove) element.removeEventListener('mousemove', this.boundMove);
    if (this.boundLeave) element.removeEventListener('mouseleave', this.boundLeave);
  }
}
