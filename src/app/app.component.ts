import { Component, OnInit, inject } from '@angular/core';
import { ScrollService } from './core/services/scroll.service';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { StatsComponent } from './sections/stats/stats.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { CertificationsComponent } from './sections/certifications/certifications.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { EducationComponent } from './sections/education/education.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';
import { CustomCursorComponent } from './shared/components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    StatsComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificationsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    ScrollToTopComponent,
    CustomCursorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private scrollService = inject(ScrollService);

  ngOnInit() {
    this.scrollService.init([
      'hero', 'about', 'skills', 'projects',
      'certifications', 'experience', 'education', 'contact',
    ]);
  }
}
