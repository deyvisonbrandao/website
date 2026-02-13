import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideEnvironmentNgxMask(),
    provideClientHydration(withEventReplay()),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    }))
  ]
};
