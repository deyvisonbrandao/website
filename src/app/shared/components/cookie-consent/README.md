# Cookie Consent Component

Este documento descreve o componente de consentimento de cookies implementado para compliance com LGPD e melhores práticas de privacidade.

## 🍪 Funcionalidades

### ✅ Compliance LGPD
- **Banner de consentimento** obrigatório na primeira visita
- **Categorização de cookies** (Necessários, Analytics, Marketing, Funcionais)
- **Configurações granulares** de preferências
- **Remoção de dados** quando consentimento é revogado
- **Documentação clara** sobre uso de cada tipo de cookie

### 🔧 Funcionalidades Técnicas
- **Persistência de preferências** via localStorage
- **Detecção de browser** para SSR compatibility
- **Integração com Google Analytics** com consentimento
- **Remoção automática de cookies** quando desabilitados
- **Observables RxJS** para reatividade
- **Acessibilidade completa** (ARIA labels, keyboard navigation)

## 📱 Interface do Usuário

### Banner de Consentimento
```html
<!-- Aparece na primeira visita -->
<div class="cookie-banner">
  - Informações sobre cookies e LGPD
  - Links para Política de Privacidade
  - Botões: "Preferências", "Apenas Necessários", "Aceitar Todos"
</div>
```

### Modal de Preferências
```html
<!-- Configurações detalhadas -->
<div class="cookie-modal">
  - 4 categorias de cookies com descrições
  - Toggles independentes (exceto necessários)
  - Botões: "Cancelar", "Salvar Preferências"
</div>
```

### Botão Flutuante
```html
<!-- Após consentimento dado -->
<button class="cookie-settings-btn">
  - Ícone de configurações
  - Reabre modal de preferências
  - Posição: bottom-right
</button>
```

## 🔧 Arquitetura Técnica

### CookieService
```typescript
interface CookiePreferences {
  necessary: boolean;    // Sempre true
  analytics: boolean;    // Google Analytics
  marketing: boolean;    // Anúncios e remarketing
  functional: boolean;   // Chat, mapas, integrações
}
```

**Métodos principais:**
- `acceptAll()` - Aceita todos os cookies
- `acceptNecessary()` - Apenas cookies essenciais
- `savePreferences(prefs)` - Salva configurações granulares
- `hasConsent()` - Verifica se consentimento foi dado
- `canUseAnalytics()` - Permite tracking de analytics
- `resetConsent()` - Remove consentimento e limpa dados

### AnalyticsService
```typescript
// Integração com Google Analytics
- initializeGoogleAnalytics() // Só com consentimento
- trackEvent(action, category, label, value)
- trackPageView(title, location)
- trackFormSubmission(form_name)
- updateConsent(analytics_consent)
- clearAnalyticsCookies() // LGPD compliance
```

## 🎨 Estilos e Design

### Tailwind CSS Classes
```css
/* Banner */
.cookie-banner {
  @apply fixed bottom-0 left-0 right-0 z-50;
  @apply bg-white dark:bg-dark-900;
  @apply border-t border-gray-200 dark:border-gray-700;
  @apply shadow-lg backdrop-blur-sm;
}

/* Modal */
.cookie-modal {
  @apply fixed inset-0 z-50 flex items-center justify-center;
  @apply bg-black bg-opacity-50 backdrop-blur-sm;
}

/* Botão flutuante */
.cookie-settings-btn {
  @apply fixed bottom-6 right-6 p-3;
  @apply bg-primary-500 hover:bg-primary-600;
  @apply text-white rounded-full shadow-lg;
}
```

### Animações CSS
- **slideUp**: Banner entrando de baixo
- **fadeIn**: Modal com fade suave
- **modalSlideIn**: Modal com scale + translate
- **floatIn**: Botão flutuante com bounce

### Responsividade
- **Mobile**: Stack vertical, padding reduzido
- **Tablet**: Layout híbrido
- **Desktop**: Layout horizontal completo

## 🔐 Compliance e Privacidade

### LGPD (Lei Geral de Proteção de Dados)
- ✅ **Consentimento explícito** para cookies não essenciais
- ✅ **Informações claras** sobre finalidade de cada cookie
- ✅ **Opt-out fácil** para revogar consentimento
- ✅ **Remoção de dados** quando consentimento é negado
- ✅ **Base legal clara** para processamento

### Categorias de Cookies

#### 🔒 Necessários (Sempre ativos)
```javascript
// Cookies essenciais para funcionamento
- Sessão de usuário
- Autenticação
- Preferências de acessibilidade
- Proteção CSRF
```

#### 📊 Analytics (Opcional)
```javascript
// Google Analytics com anonimização
- _ga, _ga_*, _gid
- Pageviews, eventos, conversões
- IP anonimizado
- Retention: 26 meses
```

#### 🎯 Marketing (Opcional)
```javascript
// Remarketing e anúncios
- Google Ads
- Facebook Pixel
- LinkedIn Insight Tag
- Retention: 365 dias
```

#### ⚡ Funcionais (Opcional)
```javascript
// Funcionalidades avançadas
- Chat widget
- Mapas (Google Maps)
- Integrações sociais
- Widgets externos
```

## 🚀 Como Usar

### 1. Importar no App Component
```typescript
import { CookieConsentComponent } from './shared/components';

@Component({
  imports: [CookieConsentComponent],
  template: `
    <main>
      <!-- Seu conteúdo -->
    </main>
    <app-cookie-consent></app-cookie-consent>
  `
})
```

### 2. Usar o CookieService
```typescript
import { CookieService } from './shared/services/cookie.service';

constructor(private cookieService: CookieService) {
  // Verificar se pode usar analytics
  if (this.cookieService.canUseAnalytics()) {
    // Inicializar tracking
  }
  
  // Observar mudanças
  this.cookieService.preferences$.subscribe(prefs => {
    console.log('Preferências:', prefs);
  });
}
```

### 3. Tracking de Analytics
```typescript
import { AnalyticsService } from './shared/services/analytics.service';

// Track eventos
this.analytics.trackEvent('click', 'button', 'header_cta');
this.analytics.trackFormSubmission('contact_form');
this.analytics.trackPageView('Home Page');
```

## 🧪 Testes

### Testes de Funcionalidade
```typescript
describe('CookieConsentComponent', () => {
  it('should show banner on first visit');
  it('should hide banner after consent');
  it('should save preferences correctly');
  it('should clear analytics cookies when disabled');
  it('should handle SSR correctly');
});
```

### Testes de Compliance
- ✅ Banner aparece na primeira visita
- ✅ Consentimento é persistido
- ✅ Cookies são removidos quando negados
- ✅ Analytics só funciona com consentimento
- ✅ Configurações podem ser alteradas

## 📱 Acessibilidade

### ARIA Labels
```html
<div role="dialog" aria-labelledby="cookie-banner-title">
<button aria-label="Abrir configurações de cookies">
<div aria-modal="true" role="dialog">
```

### Keyboard Navigation
- **Tab**: Navegar entre elementos
- **Enter/Space**: Ativar botões
- **Esc**: Fechar modal

### Screen Readers
- Títulos semânticos (h2, h3)
- Descrições claras
- Status das configurações
- Feedback de ações

## 🔄 Atualizações Futuras

### V2.0 Planejado
- [ ] **Consent mode v2** (Google)
- [ ] **Integração com GTM** (Google Tag Manager)
- [ ] **A/B testing** de banners
- [ ] **Geolocalização** para diferentes regulamentações
- [ ] **API de consentimento** para terceiros
- [ ] **Dashboard de analytics** de consentimento

### Melhorias de UX
- [ ] **Prévia de funcionalidades** (mostrar benefícios)
- [ ] **Configuração rápida** (presets)
- [ ] **Histórico de alterações**
- [ ] **Notificações de mudanças** na política

---

**Implementado com foco em compliance LGPD e experiência do usuário** 🍪✨
