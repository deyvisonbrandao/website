import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error';

export interface AlertState {
  type: AlertType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertState | null>(null);
  private timeoutId: number | null = null;

  readonly alert$ = this.alertSubject.asObservable();

  success(message: string, timeoutMs = 5000): void {
    this.show('success', message, timeoutMs);
  }

  error(message: string, timeoutMs = 5000): void {
    this.show('error', message, timeoutMs);
  }

  show(type: AlertType, message: string, timeoutMs = 5000): void {
    this.alertSubject.next({ type, message });

    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
    }

    if (timeoutMs > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.clear();
      }, timeoutMs);
    }
  }

  clear(): void {
    this.alertSubject.next(null);
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
