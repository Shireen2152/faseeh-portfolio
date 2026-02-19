import { Component, OnInit, OnDestroy, inject, signal, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { ScrollService } from '../../core/services/scroll.service';
import { BadgePillComponent } from '../../shared/components/badge-pill/badge-pill.component';
import { GradientButtonComponent } from '../../shared/components/gradient-button/gradient-button.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [BadgePillComponent, GradientButtonComponent, NgxParticlesModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  data = inject(DataService);
  scrollService = inject(ScrollService);
  platformId = inject(PLATFORM_ID);

  typedText = signal('');
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: any;

  particlesId = 'tsparticles';

  particlesOptions: any = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: ['#4AAFF1', '#5571ED', '#D94CAC', '#ED647D'] },
      links: {
        color: '#5571ED',
        distance: 150,
        enable: true,
        opacity: 0.6,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none' as const,
        outModes: { default: 'bounce' as const },
      },
      number: {
        density: { enable: true },
        value: 60,
      },
      opacity: { value: { min: 0.1, max: 0.4 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.4 } },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  };

  particlesInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  heroBadges = [
    { text: 'AWS', icon: 'assets/images/aws.svg', color: '#FF9900' },
    { text: 'Docker', icon: 'assets/images/docker.svg', color: '#2396ED' },
    { text: 'Prometheus', icon: 'assets/images/prometheus.svg', color: '#E6522C' },
    { text: 'Grafana', icon: 'assets/images/grafana.svg', color: '#f8e23f' },
    { text: 'GitHub', icon: 'assets/images/Github.svg', color: '#ffffff' },
    { text: 'GitLab CI/CD', icon: 'assets/images/Gitlab.svg', color: '#FC6D26' },
    { text: 'Linux', icon: 'assets/images/linux.svg', color: '#F8BF11' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeEffect();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.typingTimer);
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = this.data.personalInfo.resumePath;
    link.download = 'Mohamed Faseeh - Resume.pdf';
    link.click();
  }

  private typeEffect() {
    const roles = this.data.personalInfo.roles;
    const currentRole = roles[this.roleIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.typedText.set(currentRole.substring(0, this.charIndex));
    } else {
      this.charIndex++;
      this.typedText.set(currentRole.substring(0, this.charIndex));
    }

    let delay = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      delay = 400;
    }

    this.typingTimer = setTimeout(() => this.typeEffect(), delay);
  }
}
