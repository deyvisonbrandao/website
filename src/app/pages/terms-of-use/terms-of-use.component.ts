import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-use.component.html',
  styleUrl: './terms-of-use.component.scss'
})
export class TermsOfUseComponent implements OnInit {
  private seoService = inject(SeoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.seoService.updateSeoData({
      title: 'Termos de Uso - DHB | Condições de Utilização',
      description: 'Conheça os termos e condições de uso dos serviços da DHB. Direitos, deveres e responsabilidades para uma parceria transparente.',
      keywords: 'termos de uso, condições, contratos, serviços, responsabilidades',
      url: 'https://dhb.dev.br/termos-de-uso'
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
