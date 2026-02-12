import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  private alertService = inject(AlertService);

  readonly alert$ = this.alertService.alert$;

  dismiss(): void {
    this.alertService.clear();
  }
}
