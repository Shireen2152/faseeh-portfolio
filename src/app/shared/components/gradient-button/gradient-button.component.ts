import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-gradient-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="gradient-btn"
      [class.outline]="variant === 'outline'"
      [class.solid]="variant === 'solid'"
      (click)="clicked.emit($event)"
    >
      <ng-content />
    </button>
  `,
  styles: [`
    @use 'styles/variables' as *;

    .gradient-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: clamp(0.6rem, 1vw, 0.875rem) clamp(1.25rem, 2vw, 2rem);
      border-radius: $radius-md;
      font-weight: 500;
      font-size: clamp(0.8rem, 1vw, 1rem);
      transition: all $transition-base;
      white-space: nowrap;

      &.solid {
        background: linear-gradient(135deg, rgba($grad-2, 0.7), rgba($grad-3, 0.5));
        color: $white;
        border: 1px solid $border-light;

        &:hover {
          background: linear-gradient(135deg, rgba($grad-2, 0.9), rgba($grad-3, 0.7));
          box-shadow: 0 4px 20px $shadow-blue;
          transform: translateY(-2px);
        }
      }

      &.outline {
        background: rgba(255, 255, 255, 0.05);
        color: $white;
        border: 1px solid $border-medium;

        &:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: $white-40;
          transform: translateY(-2px);
        }
      }
    }
  `],
})
export class GradientButtonComponent {
  @Input() variant: 'solid' | 'outline' = 'solid';
  @Output() clicked = new EventEmitter<MouseEvent>();
}
