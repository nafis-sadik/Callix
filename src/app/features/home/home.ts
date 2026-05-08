import { Component, inject, signal } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { AuthService } from '../../core/services/auth.service';
import { PeerService } from '../../core/services/peer.service';
import { EncryptionService } from '../../core/services/encryption.service';
import { Room, RoomType, EncryptionAlgorithm } from '../../core/models/room.model';

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
  private router = inject(Router);

  // Join room
  joinGuid = '';
  
  // Create room
  newRoomName = '';
  encryptionAlgo: EncryptionAlgorithm = 'AES-GCM-256';
  
  // Chat rooms
  chatRooms = signal<Room[]>([]);
  showCreateChat = signal<boolean>(false);

  ngOnInit(): void {
    // Initialize peer connection
    const user = this.authService.currentUser();
    if (user) {
      this.peerService.initializePeer(user.id);
    }
  }

  startMeeting(): void {
    if (!this.newRoomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    const room = this.roomService.createRoom('meeting', this.newRoomName);
    this.encryptionService.generateRoomKey(room.encryptionAlgorithm);
    
    this.router.navigate(['/meeting', room.id]);
  }

  joinRoom(): void {
    if (!this.joinGuid.trim()) {
      alert('Please enter a room GUID');
      return;
    }

    this.roomService.joinRoom(this.joinGuid).then(() => {
      this.router.navigate(['/meeting', this.joinGuid]);
    }).catch(err => {
      alert('Failed to join room: ' + err);
    });
  }

  toggleCreateChat(): void {
    this.showCreateChat.update(v => !v);
  }

  createChatRoom(): void {
    if (!this.newRoomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    const room = this.roomService.createRoom('chat', this.newRoomName);
    const rooms = this.chatRooms();
    rooms.push(room);
    this.chatRooms.set([...rooms]);
    
    this.newRoomName = '';
    this.showCreateChat.set(false);
  }

  leaveChatRoom(roomId: string): void {
    const rooms = this.chatRooms().filter(r => r.id !== roomId);
    this.chatRooms.set(rooms);
  }

  getEncryptionOptions(): EncryptionAlgorithm[] {
    return ['AES-GCM-256', 'AES-CBC-256', 'ChaCha20-Poly1305'];
  }
}
