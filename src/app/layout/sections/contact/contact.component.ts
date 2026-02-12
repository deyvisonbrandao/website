import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '../../../shared/services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private analyticsService = inject(AnalyticsService);

  contactForm: FormGroup = this.fb.group({
    projectType: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: [''],
    message: ['', Validators.required],
    privacy: [false, Validators.requiredTrue]
  });

  ngOnInit(): void {
    // Track page view for contact section
    this.analyticsService.trackEvent('view', 'contact_section', 'contact_form_loaded');
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Track form submission
      this.analyticsService.trackFormSubmission('contact_form');
      this.analyticsService.trackEvent('form_submit', 'lead_generation', formData.projectType);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.message || 'Falha ao enviar email.');
        }

        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

        // Track successful submission
        this.analyticsService.trackEvent('form_success', 'lead_generation', 'contact_form_completed');

        this.contactForm.reset();
      } catch (error) {
        console.error('Contato: erro ao enviar.', error);
        alert('Nao foi possivel enviar sua mensagem. Tente novamente em instantes.');
      }
    } else {
      // Track form validation errors
      this.analyticsService.trackEvent('form_error', 'user_experience', 'contact_form_validation_failed');
    }
  }
}
