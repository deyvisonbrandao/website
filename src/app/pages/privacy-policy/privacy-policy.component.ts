import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  private seoService = inject(SeoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.seoService.updateSeoData({
      title: 'Política de Privacidade - DHB | Proteção de Dados',
      description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais. DHB está comprometida com a segurança e privacidade de nossos clientes.',
      keywords: 'política de privacidade, proteção de dados, LGPD, privacidade, segurança',
      url: 'https://dhb.dev.br/politica-de-privacidade'
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
