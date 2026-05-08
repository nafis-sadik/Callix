import { Component, inject, signal } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { AuthService } from '../../core/services/auth.service';
import { PeerService } from '../../core/services/peer.service';
import { EncryptionService } from '../../core/services/encryption.service';
import { AlertService } from '../../core/services/alert.service';
import { Room, EncryptionAlgorithm } from '../../core/models/room.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SlicePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private peerService = inject(PeerService);
  private encryptionService = inject(EncryptionService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  joinGuid = '';
  newRoomName = '';
  encryptionAlgo: EncryptionAlgorithm = 'AES-GCM-256';
  chatRooms = signal<Room[]>([]);
  showCreateChat = signal<boolean>(false);

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      if (this.peerService.peerId && this.peerService.peerId !== user.id) {
        this.peerService.destroy();
      }
      this.peerService.initializePeer(user.id);
    }
  }

  async startMeeting(): Promise<void> {
    if (!this.newRoomName.trim()) {
      this.alertService.showError('Error', 'Please enter a room name');
      return;
    }

    const room = this.roomService.createRoom('meeting', this.newRoomName, this.encryptionAlgo);
    if (this.encryptionAlgo !== 'none') {
      await this.encryptionService.generateRoomKey(this.encryptionAlgo);
    }

    this.router.navigate(['/meeting', room.id]);
  }

  joinRoom(): void {
    if (!this.joinGuid.trim()) {
      this.alertService.showError('Error', 'Please enter a room GUID');
      return;
    }

    this.roomService.joinRoom(this.joinGuid).then(() => {
      this.router.navigate(['/meeting', this.joinGuid]);
    }).catch(err => {
      this.alertService.showError('Failed to join room', String(err));
    });
  }

  toggleCreateChat(): void {
    this.showCreateChat.update(v => !v);
  }

  createChatRoom(): void {
    if (!this.newRoomName.trim()) {
      this.alertService.showError('Error', 'Please enter a room name');
      return;
    }

    const room = this.roomService.createRoom('chat', this.newRoomName, this.encryptionAlgo);
    if (this.encryptionAlgo !== 'none') {
      this.encryptionService.generateRoomKey(this.encryptionAlgo);
    }
    this.chatRooms.update(rooms => [...rooms, room]);

    this.newRoomName = '';
    this.showCreateChat.set(false);
  }

  leaveChatRoom(roomId: string): void {
    const rooms = this.chatRooms().filter(r => r.id !== roomId);
    this.chatRooms.set(rooms);
  }

  getEncryptionOptions(): { value: EncryptionAlgorithm; label: string }[] {
    return [
      { value: 'AES-GCM-256', label: 'AES-GCM-256 (Encrypted)' },
      { value: 'AES-CBC-256', label: 'AES-CBC-256 (Encrypted)' },
      { value: 'ChaCha20-Poly1305', label: 'ChaCha20-Poly1305 (Encrypted)' },
      { value: 'none', label: 'None (No Encryption)' }
    ];
  }
}