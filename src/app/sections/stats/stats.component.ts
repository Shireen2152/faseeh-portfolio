import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { CountUpDirective } from '../../core/directives/count-up.directive';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CountUpDirective, ScrollAnimateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  data = inject(DataService);
}
