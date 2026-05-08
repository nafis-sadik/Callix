import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code-modal',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  template: `
    @if (show) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="glass-card p-6 w-full max-w-sm animate__animated animate__zoomIn">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold" style="color: var(--color-text-primary);">Room QR Code</h3>
            <button (click)="onClose()" style="color: var(--color-text-secondary);">✕</button>
          </div>
           
          <div class="text-center mb-4">
            <p class="text-sm mb-2" style="color: var(--color-text-secondary);">Room ID</p>
            <p class="font-mono text-sm" style="color: var(--color-text-primary);">{{ roomId }}</p>
          </div>

          <!-- QR Code -->
          <div class="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
            <qrcode 
              [qrdata]="roomId"
              [width]="200"
              class="mx-auto">
            </qrcode>
          </div>

          <div class="flex gap-2">
            <button
              (click)="copyToClipboard()"
              class="flex-1 py-2 rounded-lg text-white text-sm font-medium"
              style="background-color: var(--color-primary);"
            >
              Copy ID
            </button>
            <button
              (click)="downloadQR()"
              class="flex-1 py-2 rounded-lg text-sm font-medium border"
              style="border-color: var(--color-glass-border); color: var(--color-text-primary); background: transparent;"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class QrCodeModalComponent {
  @Input() roomId = '';
  @Input() show = false;
  @Input() close = () => {};

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.roomId);
    alert('Room ID copied to clipboard!');
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
}
