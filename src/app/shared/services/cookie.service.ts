import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly COOKIE_CONSENT_KEY = 'dhb_cookie_consent';
  private readonly COOKIE_PREFERENCES_KEY = 'dhb_cookie_preferences';

  private consentGiven = new BehaviorSubject<boolean>(false);
  private preferences = new BehaviorSubject<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  public consentGiven$ = this.consentGiven.asObservable();
  public preferences$ = this.preferences.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadConsent();
      this.loadPreferences();
    }
  }

  private loadConsent(): void {
    const consent = localStorage.getItem(this.COOKIE_CONSENT_KEY);
    if (consent) {
      this.consentGiven.next(JSON.parse(consent));
    }
  }

  private loadPreferences(): void {
    const prefs = localStorage.getItem(this.COOKIE_PREFERENCES_KEY);
    if (prefs) {
      this.preferences.next(JSON.parse(prefs));
    }
  }

  acceptAll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };

    localStorage.setItem(this.COOKIE_CONSENT_KEY, JSON.stringify(true));
    localStorage.setItem(this.COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));

    this.consentGiven.next(true);
    this.preferences.next(allAccepted);

    this.initializeAnalytics();
  }

  acceptNecessary(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };

    localStorage.setItem(this.COOKIE_CONSENT_KEY, JSON.stringify(true));
    localStorage.setItem(this.COOKIE_PREFERENCES_KEY, JSON.stringify(necessaryOnly));

    this.consentGiven.next(true);
    this.preferences.next(necessaryOnly);
  }

  savePreferences(prefs: CookiePreferences): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Necessary cookies are always required
    prefs.necessary = true;

    localStorage.setItem(this.COOKIE_CONSENT_KEY, JSON.stringify(true));
    localStorage.setItem(this.COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));

    this.consentGiven.next(true);
    this.preferences.next(prefs);

    if (prefs.analytics) {
      this.initializeAnalytics();
    }
  }

  hasConsent(): boolean {
    return this.consentGiven.value;
  }

  getPreferences(): CookiePreferences {
    return this.preferences.value;
  }

  canUseAnalytics(): boolean {
    return this.preferences.value.analytics;
  }

  canUseMarketing(): boolean {
    return this.preferences.value.marketing;
  }

  canUseFunctional(): boolean {
    return this.preferences.value.functional;
  }

  resetConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(this.COOKIE_CONSENT_KEY);
    localStorage.removeItem(this.COOKIE_PREFERENCES_KEY);

    this.consentGiven.next(false);
    this.preferences.next({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    });
  }

  private initializeAnalytics(): void {
    // Aqui você pode inicializar o Google Analytics ou outras ferramentas
    if (this.canUseAnalytics()) {
      console.log('Analytics initialized');
      // gtag('config', 'GA_MEASUREMENT_ID');
    }
  }

  // Método para definir cookies específicos
  setCookie(name: string, value: string, days: number = 365): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  // Método para obter cookies específicos
  getCookie(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  // Método para deletar cookies específicos
  deleteCookie(name: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }
}
