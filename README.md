# DHB - Website Institucional

Website institucional moderno da DHB, empresa especializada em desenvolvimento frontend com Angular.

## 🚀 Sobre o Projeto

A DHB é uma empresa brasileira que oferece desenvolvimento frontend sob demanda, focando em Angular com arquitetura limpa, SSR, performance e design system. Este website foi desenvolvido utilizando arquitetura modular com componentes separados para facilitar manutenção e escalabilidade.

### 🎯 Características Principais

- **Arquitetura Modular**: Componentes de seção separados e reutilizáveis
- **Identidade Visual**: Design inspirado na Ateliware com cores vermelho DHB
- **Desenvolvimento Frontend Especializado**: Foco em Angular 18+ com TypeScript
- **Qualidade Garantida**: Mínimo de 70% de cobertura de testes unitários
- **Trabalho 100% Remoto**: Flexibilidade e qualidade sem fronteiras
- **Ferramentas Open Source**: Uso exclusivo de tecnologias livres

## 🛠️ Tecnologias Utilizadas

### Core
- **Angular 18** - Framework principal
- **TypeScript** - Linguagem de programação
- **Angular Universal (SSR)** - Server-side rendering para SEO
- **RxJS** - Programação reativa

### Estilização
- **Tailwind CSS v3** - Framework CSS utilitário
- **Google Fonts** - Tipografias (Inter, Poppins, Outfit)
- **Design System** - Cores Ateliware com vermelho DHB principal
- **Dark/Light Mode** - Sistema de temas alternáveis

### Qualidade e Testes  
- **Jest** - Framework de testes unitários
- **Cypress** - Testes end-to-end
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

### SEO e Performance
- **Meta tags dinâmicas** - SEO otimizado
- **Open Graph** - Compartilhamento em redes sociais
- **Smooth Scrolling** - Navegação interna suave
- **Responsive Design** - Mobile-first approach

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── core/                 # Serviços principais (SEO, etc)
│   ├── shared/              # Componentes e serviços compartilhados
│   │   └── services/        # Serviços globais (Theme, etc)
│   ├── layout/              # Componentes de layout e seções
│   │   ├── header/          # Cabeçalho do site
│   │   ├── footer/          # Rodapé do site
│   │   └── sections/        # Seções modulares da página
│   │       ├── hero/        # Seção principal (logo, título, CTAs)
│   │       ├── services/    # Showcase dos serviços
│   │       ├── differentials/ # Diferenciais da empresa
│   │       ├── portfolio/   # Projetos em destaque
│   │       └── contact/     # Formulário de contato
│   ├── features/            # Funcionalidades específicas
│   │   └── landing/         # Componente principal da landing page
│   ├── app.routes.ts       # Configuração de rotas
│   ├── app.html            # Template principal
│   └── app.ts              # Componente raiz
└── assets/                  # Recursos estáticos
    └── images/             # Logo DHB e outras imagens
```

### 🧩 Componentes Modulares

Cada seção foi separada em um componente independente para facilitar manutenção:

- **HeroComponent** - Apresentação principal com logo SVG, título e botões CTA
- **ServicesComponent** - Grid de serviços (Angular, UI/UX, Consultoria)
- **DifferentialsComponent** - Cards dos diferenciais (Qualidade, Remoto, Open Source)
- **PortfolioComponent** - Showcase de projetos com hover effects
- **ContactComponent** - Formulário reativo com validação completa

### 📁 Barrel Exports

```typescript
// src/app/layout/sections/index.ts
export { HeroComponent } from './hero/hero.component';
export { ServicesComponent } from './services/services.component';
export { DifferentialsComponent } from './differentials/differentials.component';
export { PortfolioComponent } from './portfolio/portfolio.component';
export { ContactComponent } from './contact/contact.component';
```

### 📱 Seções do Website

1. **Hero Section** - Logo DHB, apresentação da empresa e call-to-actions
2. **Serviços** - Desenvolvimento Angular, UI/UX Frontend, Consultoria Técnica
3. **Diferenciais** - Qualidade Garantida, 100% Remoto, Open Source
4. **Portfólio** - Showcase de projetos (E-commerce, Dashboard, Landing Pages)
5. **Contato** - Formulário reativo completo e informações de contato

### 🎨 Design System

**Cores Principais:**
```css
/* Vermelho DHB (Primary) */
--primary-500: #ef4444;
--primary-600: #dc2626;

/* Ateliware Gradients */
--gradient-ateliware: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-ateliware-light: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

**Logo System:**
- SVG único com alternância CSS para dark/light mode
- Filtro `invert(1)` para modo escuro
- Dimensões responsivas (h-16 lg:h-20)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Angular CLI 18+

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/dhb-dev/website.git
   cd dhb
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   ng serve --port 4201
   ```

4. **Acesse a aplicação**
   - Abra http://localhost:4201 no navegador
   - A aplicação recarregará automaticamente ao modificar arquivos

### Comandos Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia servidor de desenvolvimento
npm run build               # Build para produção
npm run build:ssr          # Build com SSR
npm run serve:ssr          # Serve a versão SSR

# Qualidade de Código
npm test                    # Executa testes unitários
npm run test:coverage      # Testes com relatório de cobertura
npm run e2e                # Testes end-to-end
npm run lint               # Verifica lint
npm run format             # Formata código com Prettier

# Produção
npm run serve:ssr:dhb      # Serve a aplicação SSR em produção
```

## 🎨 Identidade Visual

### Paleta de Cores

```css
/* Vermelho DHB (Primary) */
--primary-500: #ef4444;
--primary-600: #dc2626;

/* Ateliware Gradients */
--gradient-ateliware: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-ateliware-light: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Dark Theme */
--dark-900: #0f172a;
--dark-950: #020617;
--gray-300: #d1d5db;
--gray-600: #4b5563;

/* Light Theme */
--white: #ffffff;
--gray-50: #f9fafb;
```

### Logo System

O projeto utiliza um sistema de logo único com CSS:

```css
/* Logo com alternância para dark mode */
.hero-logo {
  filter: invert(0); /* Light mode */
}

.dark .hero-logo {
  filter: invert(1); /* Dark mode */
}
```

### Navegação Interna

A página utiliza navegação suave entre seções implementada no HeroComponent:

```typescript
// Hero Component - Navegação entre seções
scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
```

### Componentes Modulares

Cada seção é um componente independente:

```typescript
// Layout principal no App Component
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, 
    FooterComponent, 
    HeroComponent, 
    ServicesComponent, 
    DifferentialsComponent, 
    PortfolioComponent, 
    ContactComponent
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services />
      <app-differentials />
      <app-portfolio />
      <app-contact />
    </main>
    <app-footer />
  `
})
```

## 📱 Responsividade

O design é totalmente responsivo com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Mobile-First Approach
- Menu hamburger para dispositivos móveis
- Cards empilhados em telas pequenas
- Formulário adaptativo
- Imagens responsivas

## 🔍 SEO e Performance

### Meta Tags Dinâmicas
```typescript
// Configuração SEO no App Component
this.seoService.updateSeoData({
  title: 'DHB - Frontend Solutions | Desenvolvimento Angular Especializado',
  description: 'Transformamos suas ideias em interfaces excepcionais com Angular, TypeScript e as melhores práticas de desenvolvimento frontend.',
  keywords: 'angular, typescript, frontend, desenvolvimento, ui/ux, design',
  url: 'https://dhb.dev.br'
});
```

### Performance Otimizada
- **Bundle inicial**: ~72KB (desenvolvimento)
- **Lazy Loading**: Componentes de seção modulares
- **SSR**: Server-side rendering habilitado
- **Smooth Scrolling**: Animações CSS otimizadas
- **ViewEncapsulation.None**: Para componentes de seção

## 🧪 Testes

### Testes Unitários
```bash
npm test                    # Executa todos os testes
npm run test:watch         # Modo watch para desenvolvimento
npm run test:coverage      # Relatório de cobertura
```

### Cobertura de Testes
Mantemos mínimo de **70% de cobertura** em:
- App Component
- Section Components (Hero, Services, Differentials, Portfolio, Contact)
- Layout Components (Header, Footer)
- Services (Theme, SEO)

## 🚀 Deploy

### Build de Produção
```bash
npm run build:ssr         # Build com SSR
```

### Variáveis de Ambiente
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.dhb.dev.br',
  siteUrl: 'https://dhb.dev.br'
};
```

### Hospedagem Recomendada
- **Hostinger** - Hospedagem principal
- **Vercel** - Deploy automático via Git
- **Netlify** - Alternativa para projetos Angular

## 📊 Formulário de Contato

O ContactComponent implementa um formulário reativo completo:

```typescript
interface ContactForm {
  projectType: string;    // Tipo de projeto (obrigatório)
  name: string;          // Nome do cliente (obrigatório)
  email: string;         // Email para contato (obrigatório)
  phone?: string;        // Telefone (opcional)
  company?: string;      // Empresa (opcional)
  message: string;       // Descrição do projeto (obrigatório)
  privacy: boolean;      // Aceite da LGPD (obrigatório)
}
```

### Validações Implementadas
- **Nome**: Mínimo 2 caracteres
- **Email**: Validação de formato
- **Mensagem**: Mínimo 10 caracteres
- **Privacidade**: Aceite obrigatório (LGPD)
- **Tipo de Projeto**: Seleção obrigatória

### Tipos de Projeto Disponíveis
- Website Institucional
- E-commerce
- Dashboard/Admin
- Aplicação Web
- Consultoria Técnica
- Outros

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Add: nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. **Abra** um Pull Request

### Padrões de Commit
```
feat: nova funcionalidade
fix: correção de bug  
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de build
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Website**: https://dhb.dev.br
- **Email**: contato@dhb.dev.br
- **LinkedIn**: https://linkedin.com/company/dhb-consultoria
- **WhatsApp**: (11) 99999-9999

---

**DHB - Transformando ideias em interfaces excepcionais** 🚀
