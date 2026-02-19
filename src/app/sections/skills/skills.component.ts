import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent, ScrollAnimateDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  data = inject(DataService);

  activeCategory = signal('All');

  categories = computed(() => {
    const cats = new Set(this.data.skills.map(s => s.category));
    return ['All', ...cats];
  });

  filteredSkills = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.data.skills;
    return this.data.skills.filter(s => s.category === cat);
  });

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }
}
