import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from './cookie.service';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  private analyticsInitialized = false;

  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIfConsented();

      this.cookieService.preferences$.subscribe(preferences => {
        if (preferences.analytics && !this.analyticsInitialized) {
          this.initializeGoogleAnalytics();
        } else if (!preferences.analytics && this.analyticsInitialized) {
          this.disableAnalytics();
        }
      });
    }
  }

  private initializeIfConsented(): void {
    if (this.cookieService.canUseAnalytics()) {
      this.initializeGoogleAnalytics();
    }
  }

  private initializeGoogleAnalytics(): void {
    if (!isPlatformBrowser(this.platformId) || this.analyticsInitialized) {
      return;
    }

    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', this.GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
        send_page_view: true
      });

      this.analyticsInitialized = true;
      console.log('Google Analytics initialized');
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  }

  private disableAnalytics(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });

      this.clearAnalyticsCookies();

      this.analyticsInitialized = false;
      console.log('Google Analytics disabled');
    } catch (error) {
      console.error('Error disabling Google Analytics:', error);
    }
  }

  private clearAnalyticsCookies(): void {
    const cookiesToClear = [
      '_ga',
      '_ga_' + this.GA_MEASUREMENT_ID.replace('G-', ''),
      '_gid',
      '_gat',
      '_gtag'
    ];

    cookiesToClear.forEach(cookieName => {
      this.cookieService.deleteCookie(cookieName);
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${window.location.hostname}`;
    });
  }

  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (!this.cookieService.canUseAnalytics() || !isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  trackFormSubmission(form_name: string): void {
    this.trackEvent('form_submit', 'engagement', form_name);
  }
}
