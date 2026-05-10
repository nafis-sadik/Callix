import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { QRCodeComponent } from 'angularx-qrcode';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-qr-code-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, QRCodeComponent],
  template: `
    <p-dialog
      [visible]="show"
      (visibleChange)="onVisibleChange($event)"
      header="Room QR Code"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [closable]="true"
      class="max-w-sm w-full">
      <div class="text-center mb-4">
        <p class="text-sm mb-2 text-muted-color">Room ID</p>
        <p class="font-mono text-sm">{{ roomId }}</p>
      </div>
      <div class="bg-white/90 dark:bg-white/10 p-4 rounded-lg mb-4 flex items-center justify-center">
        <qrcode [qrdata]="roomId" [width]="200" class="mx-auto"></qrcode>
      </div>
      <ng-template pTemplate="footer">
        <div class="flex gap-2">
          <p-button label="Copy ID" (onClick)="copyToClipboard()"></p-button>
          <p-button label="Download" severity="secondary" [text]="true" (onClick)="downloadQR()"></p-button>
        </div>
      </ng-template>
    </p-dialog>
  `
})
export class QrCodeModalComponent {
  private alertService = inject(AlertService);
  @Input() roomId = '';
  @Input() show = false;
  @Input() close = () => {};

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.roomId);
      this.alertService.showSuccess('Copied!', 'Room ID copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  downloadQR(): void {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'room-qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  }

  onClose(): void {
    this.close();
  }

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close();
    }
  }
}
