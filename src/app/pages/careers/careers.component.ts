import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private seoService = inject(SeoService);
  private alertService = inject(AlertService);

  careersForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;

  specialties = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Fullstack Developer' },
    { value: 'uiux', label: 'UI/UX Designer' },
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'vendas', label: 'Vendas/Comercial' },
    { value: 'qa', label: 'Quality Assurance' },
    { value: 'devops', label: 'DevOps/Infraestrutura' },
    { value: 'pm', label: 'Project Manager' },
    { value: 'outros', label: 'Outros' }
  ];

  constructor() {
    this.careersForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      especialidade: ['', Validators.required],
      experiencia: ['', Validators.required],
      linkedin: [''],
      github: [''],
      portfolio: [''],
      mensagem: ['']
    });
  }

  ngOnInit(): void {
    this.seoService.updateSeoData({
      title: 'Trabalhe Conosco - DHB | Oportunidades de Carreira em Desenvolvimento',
      description: 'Junte-se à equipe DHB! Oportunidades para desenvolvedores frontend, backend, designers UI/UX e profissionais de tecnologia. Envie seu currículo e faça parte do nosso time.',
      keywords: 'trabalhe conosco, vagas, desenvolvedor, frontend, backend, ui/ux, carreira, tecnologia, dhb, oportunidades'
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        this.selectedFile = file;
      } else {
        this.alertService.error('O arquivo deve ter no máximo 5MB.');
        event.target.value = '';
      }
    } else {
      this.alertService.error('Apenas arquivos PDF são aceitos.');
      event.target.value = '';
    }
  }

  formatPhone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length >= 7) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    this.careersForm.get('telefone')?.setValue(value);
  }

  onSubmit(): void {
    if (this.careersForm.valid && this.selectedFile) {
      this.isSubmitting = true;

      // Simular envio do formulário
      const formData = new FormData();
      formData.append('curriculo', this.selectedFile);

      Object.keys(this.careersForm.value).forEach(key => {
        formData.append(key, this.careersForm.value[key]);
      });

      // Simular delay de envio
      setTimeout(() => {
        console.log('Formulário enviado:', this.careersForm.value);
        console.log('Arquivo:', this.selectedFile);

        this.isSubmitting = false;
        this.alertService.success('Curriculo enviado com sucesso! Entraremos em contato em breve.');
        this.careersForm.reset();
        this.selectedFile = null;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.careersForm.controls).forEach(key => {
      this.careersForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.careersForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
