import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeaderComponent, ScrollAnimateDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  data = inject(DataService);
}
