import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService);

  showMessage(
    severity: 'success' | 'info' | 'warn' | 'error',
    time: number,
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: time,
    });
  }
}
