import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionHeaderComponent, GlassCardComponent, ScrollAnimateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  data = inject(DataService);
}
