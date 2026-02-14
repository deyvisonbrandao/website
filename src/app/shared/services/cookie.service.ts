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

    prefs.necessary = true;

    localStorage.setItem(this.COOKIE_CONSENT_KEY, JSON.stringify(true));
    localStorage.setItem(this.COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));

    this.consentGiven.next(true);
    this.preferences.next(prefs);

    if (prefs.analytics) {
      this.initializeAnalytics();
    }
  }

  canUseAnalytics(): boolean {
    return this.preferences.value.analytics;
  }

  private initializeAnalytics(): void {
    if (this.canUseAnalytics()) {
      console.log('Analytics initialized');
    }
  }

  deleteCookie(name: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }
}
