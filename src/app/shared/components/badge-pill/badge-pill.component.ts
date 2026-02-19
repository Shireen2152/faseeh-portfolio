import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge-pill" [style.border-color]="color" [style.color]="color" [style.--badge-glow]="color + '40'">
      @if (icon) {
        <img [src]="icon" [alt]="text" class="badge-icon" />
      }
      {{ text }}
    </span>
  `,
  styles: [`
    @use 'styles/variables' as *;

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.85rem;
      border-radius: $radius-full;
      border: 1px solid;
      background: rgba(255, 255, 255, 0.06);
      font-size: clamp(0.7rem, 0.9vw, 0.875rem);
      font-weight: 500;
      white-space: nowrap;
      cursor: default;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                  background 0.3s ease,
                  box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-4px) scale(1.08);
        background: rgba(255, 255, 255, 0.12);
        box-shadow: 0 4px 20px var(--badge-glow);

        .badge-icon {
          animation: iconBounce 0.5s ease;
        }
      }
    }

    .badge-icon {
      width: clamp(16px, 1.5vw, 24px);
      height: clamp(16px, 1.5vw, 24px);
      transition: transform 0.3s ease;
    }

    @keyframes iconBounce {
      0%   { transform: scale(1) rotate(0deg); }
      30%  { transform: scale(1.3) rotate(-10deg); }
      60%  { transform: scale(0.9) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
  `],
})
export class BadgePillComponent {
  @Input({ required: true }) text = '';
  @Input() icon = '';
  @Input() color = '#ffffff';
}
