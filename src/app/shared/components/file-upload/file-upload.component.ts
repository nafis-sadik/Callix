import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `
    <div class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-all"
         style="border-color: var(--color-glass-border);"
         (click)="fileInput.click()"
         (dragover)="onDragOver($event)"
         (drop)="onDrop($event)">
      <input #fileInput type="file" class="hidden" (change)="onFileSelected($event)" />
      <p style="color: var(--color-text-secondary);">
        Click or drag files here to share
      </p>
    </div>
  `
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileSelected.emit(files[0]);
    }
  }
}
