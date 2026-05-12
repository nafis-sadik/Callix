import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-media-player-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './media-player-modal.component.html',
  styleUrl: './media-player-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerModalComponent {
  @Input() show = false;
  @Input() isHost = false;
  @Input() mediaUrl = '';
  @Output() mediaUrlChange = new EventEmitter<string>();
  @Output() loadMedia = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
