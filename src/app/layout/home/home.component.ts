import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { ContactComponent, DifferentialsComponent, HeroComponent, PortfolioComponent, ServicesComponent, TechnologiesComponent } from "../sections";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    TechnologiesComponent,
    DifferentialsComponent,
    PortfolioComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSeoData({
      title: 'DHB - Frontend Solutions | Desenvolvimento Angular Especializado',
      description: 'Transformamos suas ideias em interfaces excepcionais com Angular, TypeScript e as melhores práticas de desenvolvimento frontend. Qualidade garantida, trabalho remoto.',
      keywords: 'angular, typescript, frontend, desenvolvimento, react, vue, javascript, ui/ux, design',
      url: 'https://dhb.dev.br'
    });
  }
}
