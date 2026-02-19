import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { DataService } from '../../core/services/data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ScrollAnimateDirective } from '../../core/directives/scroll-animate.directive';

// ── Replace these with your actual EmailJS credentials ──
const EMAILJS_SERVICE_ID = 'service_7drbflu';
const EMAILJS_TEMPLATE_ID = 'template_22d21qb';
const EMAILJS_PUBLIC_KEY = 'w6igX2W8URRAE7MXn';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SectionHeaderComponent, GlassCardComponent, ScrollAnimateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  data = inject(DataService);

  form = {
    name: '',
    email: '',
    message: '',
  };

  sending = signal(false);
  status = signal<'idle' | 'success' | 'error'>('idle');

  async onSubmit(): Promise<void> {
    if (this.sending()) return;

    this.sending.set(true);
    this.status.set('idle');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      this.status.set('success');
      this.form = { name: '', email: '', message: '' };
    } catch {
      this.status.set('error');
    } finally {
      this.sending.set(false);
    }
  }
}
