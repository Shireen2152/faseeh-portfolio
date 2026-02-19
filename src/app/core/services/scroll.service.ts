import { Injectable, signal, NgZone, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private doc = inject(DOCUMENT);
  private zone = inject(NgZone);

  activeSection = signal('hero');
  scrollY = signal(0);
  showScrollTop = signal(false);

  private sectionIds: string[] = [];
  private ticking = false;

  init(sectionIds: string[]) {
    this.sectionIds = sectionIds;
    this.zone.runOutsideAngular(() => {
      this.doc.defaultView?.addEventListener('scroll', () => this.onScroll(), { passive: true });
    });
  }

  private onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const y = this.doc.defaultView?.scrollY ?? 0;
        this.zone.run(() => {
          this.scrollY.set(y);
          this.showScrollTop.set(y > 300);
          this.updateActiveSection();
        });
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateActiveSection() {
    const offset = 200;
    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const el = this.doc.getElementById(this.sectionIds[i]);
      if (el && el.getBoundingClientRect().top <= offset) {
        this.activeSection.set(this.sectionIds[i]);
        return;
      }
    }
    this.activeSection.set(this.sectionIds[0]);
  }

  scrollTo(sectionId: string) {
    const el = this.doc.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop() {
    this.doc.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
