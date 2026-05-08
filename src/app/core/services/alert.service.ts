import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  async showSuccess(title: string, text?: string): Promise<void> {
    await Swal.fire({
      icon: 'success',
      title,
      text,
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      confirmButtonColor: 'var(--color-primary)',
      backdrop: 'rgba(0,0,0,0.5)',
      timer: 3000,
      timerProgressBar: true
    });
  }

  async showError(title: string, text?: string): Promise<void> {
    await Swal.fire({
      icon: 'error',
      title,
      text,
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      confirmButtonColor: 'var(--color-primary)',
      backdrop: 'rgba(0,0,0,0.5)'
    });
  }

  async showConfirm(title: string, text?: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-text-secondary)',
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      backdrop: 'rgba(0,0,0,0.5)'
    });
    return result.isConfirmed;
  }

  async showKicked(message: string): Promise<void> {
    await Swal.fire({
      icon: 'warning',
      title: 'Removed from Meeting',
      text: message,
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      confirmButtonColor: 'var(--color-danger)',
      backdrop: 'rgba(0,0,0,0.5)',
      allowOutsideClick: false
    });
  }

  async showRoomDestroyed(): Promise<void> {
    await Swal.fire({
      icon: 'info',
      title: 'Meeting Ended',
      text: 'The host has ended the meeting.',
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      confirmButtonColor: 'var(--color-primary)',
      backdrop: 'rgba(0,0,0,0.5)',
      allowOutsideClick: false
    });
  }

  async showLargeFileWarning(fileName: string, fileSize: number): Promise<boolean> {
    const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Large File',
      text: `${fileName} is ${sizeMB}MB. Large files may take time to transfer over P2P. Continue?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'var(--color-warning)',
      cancelButtonColor: 'var(--color-text-secondary)',
      background: 'var(--color-glass-bg)',
      color: 'var(--color-text-primary)',
      backdrop: 'rgba(0,0,0,0.5)'
    });
    return result.isConfirmed;
  }
}
