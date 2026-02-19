import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      @if (subtitle) {
        <p class="section-subtitle">{{ subtitle }}</p>
      }
      <div class="gradient-bar"></div>
    </div>
  `,
  styles: [`
    @use 'styles/variables' as *;

    .section-header {
      text-align: center;
      margin-bottom: clamp(2rem, 4vw, 4rem);
    }

    .section-title {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      color: $white;
      margin-bottom: 0.5rem;
    }

    .section-subtitle {
      color: $white-60;
      font-size: clamp(0.875rem, 1.2vw, 1.125rem);
      max-width: 600px;
      margin: 0 auto 1rem;
    }

    .gradient-bar {
      width: 80px;
      height: 4px;
      background: $brand-gradient;
      border-radius: 2px;
      margin: 0 auto;
    }
  `],
})
export class SectionHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
}
