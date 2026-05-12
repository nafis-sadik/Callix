import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { Message, SharedFile } from '../../../../core/models/room.model';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DrawerModule, ButtonModule, InputTextModule,
    TooltipModule, FileUploadComponent, TimeAgoPipe
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPanelComponent {
  @Input() show = false;
  @Input() messages: Message[] = [];
  @Input() getFileById: (id: string) => SharedFile | undefined = () => undefined;
  @Input() currentUserId = '';
  @Input() isHost = false;
  @Output() close = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<string>();
  @Output() fileSelected = new EventEmitter<File>();
  @Output() downloadFile = new EventEmitter<SharedFile>();

  messageText = signal('');

  static readonly EMOJIS = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '👋', '😎'];
  protected readonly EMOJIS = ChatPanelComponent.EMOJIS;

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close.emit();
    }
  }

  onSend(): void {
    const text = this.messageText().trim();
    if (!text) return;
    this.sendMessage.emit(text);
    this.messageText.set('');
  }

  insertEmoji(emoji: string): void {
    this.messageText.update(v => v + emoji);
  }

  onFileSelected(file: File): void {
    this.fileSelected.emit(file);
  }

  onDownloadFile(file: SharedFile | undefined): void {
    if (file) {
      this.downloadFile.emit(file);
    }
  }
}
