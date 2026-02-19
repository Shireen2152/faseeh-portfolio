import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="scroll-top-btn"
      [class.visible]="scrollService.showScrollTop()"
      (click)="scrollService.scrollToTop()"
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  `,
  styles: [`
    @use 'styles/variables' as *;

    .scroll-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, $grad-2, $grad-3);
      color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: $z-scroll-top;
      opacity: 0;
      transform: translateY(20px);
      transition: all $transition-base;
      pointer-events: none;
      box-shadow: 0 4px 15px $shadow-blue;

      &.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 25px $shadow-blue-strong;
      }
    }
  `],
})
export class ScrollToTopComponent {
  scrollService = inject(ScrollService);
}
