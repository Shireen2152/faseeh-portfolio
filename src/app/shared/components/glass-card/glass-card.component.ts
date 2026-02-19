import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="glass-card-wrapper" [class.hoverable]="hoverable" [class.shine]="shine">
      <ng-content />
    </div>
  `,
  styles: [`
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .glass-card-wrapper {
      @include glass-card;
      padding: clamp(1.25rem, 2vw, 2rem);

      &.hoverable {
        cursor: pointer;
        transition: all $transition-base;

        &:hover {
          @include glass-card-hover;
        }
      }

      &.shine {
        @include shine-effect;
      }
    }
  `],
})
export class GlassCardComponent {
  @Input() hoverable = false;
  @Input() shine = false;
}
