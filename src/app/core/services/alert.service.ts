import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  showSuccess(title: string, text?: string): void {
    this.messageService.add({ severity: 'success', summary: title, detail: text, life: 3000 });
  }

  showError(title: string, text?: string): void {
    this.messageService.add({ severity: 'error', summary: title, detail: text, life: 5000 });
  }

  showConfirm(title: string, text?: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: title,
        message: text,
        accept: () => resolve(true),
        reject: () => resolve(false)
      });
    });
  }

  showKicked(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: 'Removed from Meeting',
        message,
        rejectVisible: false,
        closable: false,
        accept: () => resolve()
      });
    });
  }

  showRoomDestroyed(): Promise<void> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: 'Meeting Ended',
        message: 'The host has ended the meeting.',
        rejectVisible: false,
        closable: false,
        accept: () => resolve()
      });
    });
  }

  showLargeFileWarning(fileName: string, fileSize: number): Promise<boolean> {
    const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: 'Large File',
        message: `${fileName} is ${sizeMB}MB. Large files may take time to transfer over P2P. Continue?`,
        acceptLabel: 'Proceed',
        rejectLabel: 'Cancel',
        accept: () => resolve(true),
        reject: () => resolve(false)
      });
    });
  }
}
