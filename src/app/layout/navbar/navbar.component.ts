import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  scrollService = inject(ScrollService);
  dataService = inject(DataService);
  mobileOpen = signal(false);

  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  navigate(sectionId: string) {
    this.scrollService.scrollTo(sectionId);
    this.mobileOpen.set(false);
  }
}
