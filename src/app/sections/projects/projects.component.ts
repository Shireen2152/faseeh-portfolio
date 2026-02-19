import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Project } from '../../core/models/portfolio.models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { BadgePillComponent } from '../../shared/components/badge-pill/badge-pill.component';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionHeaderComponent, GlassCardComponent, BadgePillComponent, ScrollAnimateDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  data = inject(DataService);

  activeCategory = signal('All');
  selectedProject = signal<Project | null>(null);

  filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.data.projects;
    return this.data.projects.filter(p => p.category === cat);
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  openModal(project: Project) {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}
