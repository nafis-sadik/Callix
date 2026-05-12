import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FileUploadModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-fileUpload
      mode="basic"
      [auto]="false"
      chooseLabel="Share File"
      (onSelect)="onFileSelect($event)"
      [accept]="'*'"
    />
  `
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();

  onFileSelect(event: { files?: File[]; target?: { files?: FileList } }): void {
    const file = event.files?.[0] || event.target?.files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
