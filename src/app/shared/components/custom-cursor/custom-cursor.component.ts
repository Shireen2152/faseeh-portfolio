import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID,
  ChangeDetectionStrategy, NgZone, ElementRef, ViewChild, AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

// Brand gradient colors
const COLORS = ['#4AAFF1', '#5571ED', '#D94CAC', '#ED647D', '#ffffff'];

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `],
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private prevX = 0;
  private prevY = 0;
  private rafId = 0;
  private active = false;
  private moveCounter = 0;

  private boundMove?: (e: MouseEvent) => void;
  private boundClick?: (e: MouseEvent) => void;
  private boundResize?: () => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    this.active = true;
  }

  ngAfterViewInit(): void {
    if (!this.active) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();

    this.zone.runOutsideAngular(() => {
      this.boundMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        // Spawn particles based on movement speed (throttled)
        this.moveCounter++;
        if (this.moveCounter % 2 === 0) {
          const dx = this.mouseX - this.prevX;
          const dy = this.mouseY - this.prevY;
          const speed = Math.sqrt(dx * dx + dy * dy);
          const count = Math.min(Math.floor(speed * 0.3), 5);
          for (let i = 0; i < Math.max(1, count); i++) {
            this.spawnParticle(this.mouseX, this.mouseY, false);
          }
          this.prevX = this.mouseX;
          this.prevY = this.mouseY;
        }
      };

      this.boundClick = (e: MouseEvent) => {
        // Burst of particles on click
        for (let i = 0; i < 18; i++) {
          this.spawnParticle(e.clientX, e.clientY, true);
        }
      };

      this.boundResize = () => this.resize();

      document.addEventListener('mousemove', this.boundMove);
      document.addEventListener('click', this.boundClick);
      window.addEventListener('resize', this.boundResize);

      this.animate();
    });
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private spawnParticle(x: number, y: number, burst: boolean): void {
    const angle = Math.random() * Math.PI * 2;
    const speed = burst
      ? 2 + Math.random() * 4
      : 0.5 + Math.random() * 2;
    const maxLife = burst
      ? 40 + Math.random() * 30
      : 25 + Math.random() * 20;

    this.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: burst ? 2 + Math.random() * 4 : 1.5 + Math.random() * 3,
      opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife,
    });

    // Cap particles for performance
    if (this.particles.length > 200) {
      this.particles.splice(0, this.particles.length - 200);
    }
  }

  private animate(): void {
    const { ctx } = this;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.life++;
      p.x += p.vx;
      p.y += p.vy;

      // Slight gravity pull
      p.vy += 0.03;
      // Friction
      p.vx *= 0.98;
      p.vy *= 0.98;

      const progress = p.life / p.maxLife;
      p.opacity = 1 - progress;
      const currentRadius = p.radius * (1 - progress * 0.5);

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.hexToRgba(p.color, p.opacity);
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.hexToRgba(p.color, p.opacity * 0.15);
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.boundMove) document.removeEventListener('mousemove', this.boundMove);
    if (this.boundClick) document.removeEventListener('click', this.boundClick);
    if (this.boundResize) window.removeEventListener('resize', this.boundResize);
  }
}
