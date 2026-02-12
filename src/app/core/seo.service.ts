import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultTitle = 'DHB - Desenvolvimento Frontend Especializado em Angular';
  private defaultDescription = 'DHB é uma empresa brasileira especializada em desenvolvimento frontend com Angular. Oferecemos arquitetura, SSR, performance e design system com qualidade garantida e cobertura de testes.';
  private defaultImage = '/assets/images/dhb-og-image.jpg';
  private baseUrl = 'https://dhb.dev.br';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateSeoData(seoData: SeoData): void {
    // Update title
    const title = seoData.title ? `${seoData.title} | DHB` : this.defaultTitle;
    this.titleService.setTitle(title);

    // Update meta tags
    this.updateMetaTag('description', seoData.description || this.defaultDescription);
    this.updateMetaTag('keywords', seoData.keywords || 'Angular, Frontend, Desenvolvimento, SSR, Performance, Design System, Testes Unitários');

    // Open Graph tags
    this.updateMetaTag('og:title', title, 'property');
    this.updateMetaTag('og:description', seoData.description || this.defaultDescription, 'property');
    this.updateMetaTag('og:image', seoData.image || this.defaultImage, 'property');
    this.updateMetaTag('og:url', seoData.url || this.baseUrl, 'property');
    this.updateMetaTag('og:type', seoData.type || 'website', 'property');
    this.updateMetaTag('og:site_name', 'DHB', 'property');

    // Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', title, 'name');
    this.updateMetaTag('twitter:description', seoData.description || this.defaultDescription, 'name');
    this.updateMetaTag('twitter:image', seoData.image || this.defaultImage, 'name');

    // Additional SEO tags
    this.updateMetaTag('robots', 'index, follow');
    this.updateMetaTag('author', 'DHB');
    this.updateMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  private updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
    const selector = `${attribute}="${name}"`;

    if (this.metaService.getTag(selector)) {
      this.metaService.updateTag({ [attribute]: name, content });
    } else {
      this.metaService.addTag({ [attribute]: name, content });
    }
  }

  setCanonicalUrl(url: string): void {
    const canonicalUrl = url || this.baseUrl;
    let link: HTMLLinkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}
