import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CareersComponent } from './pages/careers/careers.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'DHB - Frontend Solutions | Desenvolvimento Angular Especializado' }
  },
  {
    path: 'trabalhe-conosco',
    component: CareersComponent,
    data: { title: 'Trabalhe Conosco - DHB | Oportunidades de Carreira' }
  },
  {
    path: 'politica-de-privacidade',
    component: PrivacyPolicyComponent,
    data: { title: 'Política de Privacidade - DHB | Proteção de Dados' }
  },
  {
    path: 'termos-de-uso',
    component: TermsOfUseComponent,
    data: { title: 'Termos de Uso - DHB | Condições de Utilização' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
