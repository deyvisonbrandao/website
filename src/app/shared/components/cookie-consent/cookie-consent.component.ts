import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CookiePreferences, CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CookieConsentComponent implements OnInit, OnDestroy {
  private cookieService = inject(CookieService);
  private destroy$ = new Subject<void>();

  showBanner = false;
  showPreferences = false;
  preferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  };

  ngOnInit(): void {
    // Verificar se o usuário já deu consentimento
    this.cookieService.consentGiven$
      .pipe(takeUntil(this.destroy$))
      .subscribe(hasConsent => {
        this.showBanner = !hasConsent;
      });

    // Carregar preferências atuais
    this.cookieService.preferences$
      .pipe(takeUntil(this.destroy$))
      .subscribe(prefs => {
        this.preferences = { ...prefs };
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  acceptAll(): void {
    this.cookieService.acceptAll();
    this.showBanner = false;
    this.showPreferences = false;
  }

  acceptNecessary(): void {
    this.cookieService.acceptNecessary();
    this.showBanner = false;
    this.showPreferences = false;
  }

  openPreferences(): void {
    this.showPreferences = true;
  }

  closePreferences(): void {
    this.showPreferences = false;
  }

  savePreferences(): void {
    this.cookieService.savePreferences(this.preferences);
    this.showBanner = false;
    this.showPreferences = false;
  }

  resetConsent(): void {
    this.cookieService.resetConsent();
    this.showBanner = true;
    this.showPreferences = false;
  }
}
