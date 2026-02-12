import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'trabalhe-conosco',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'politica-de-privacidade',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'termos-de-uso',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
