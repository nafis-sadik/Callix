import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { VideoResolution, VideoSettings } from '../../meeting-room/meeting-room';

@Component({
  selector: 'app-video-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, CheckboxModule, RadioButtonModule],
  templateUrl: './video-settings-modal.component.html',
  styleUrl: './video-settings-modal.component.scss'
})
export class VideoSettingsModalComponent {
  @Input() show = false;
  @Input() settings!: VideoSettings;
  @Input() presets: VideoResolution[] = [];
  @Output() settingsChange = new EventEmitter<VideoSettings>();
  @Output() apply = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onCustomChange(): void {
    this.settingsChange.emit({ ...this.settings, custom: !this.settings.custom });
  }

  onResolutionChange(index: number): void {
    this.settingsChange.emit({ ...this.settings, resolutionIndex: index });
  }

  onApply(): void {
    this.apply.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
