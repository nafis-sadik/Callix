import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService, JoinResult } from '../../core/services/room.service';
import { AuthService } from '../../core/services/auth.service';
import { PeerService } from '../../core/services/peer.service';
import { EncryptionService } from '../../core/services/encryption.service';
import { AlertService } from '../../core/services/alert.service';
import { Room, EncryptionAlgorithm, RoomType } from '../../core/models/room.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SlicePipe,
    InputTextModule, ButtonModule, SelectModule, TooltipModule, TagModule,
    CardModule, IconFieldModule, InputIconModule, DialogModule, ToggleButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private peerService = inject(PeerService);
  private encryptionService = inject(EncryptionService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  joinGuid = '';
  newRoomName = '';
  encryptionAlgo: EncryptionAlgorithm = 'AES-GCM-256';
  roomType: RoomType = 'meeting';
  chatRooms = signal<Room[]>([]);
  showQrScanner = signal(false);
  private qrCodeReader: Html5Qrcode | null = null;

  isMeeting = true;
  joiningState = signal<'idle' | 'waiting'>('idle');
  joiningRoomId = '';

  encryptionOptions = [
    { value: 'AES-GCM-256', label: 'AES-GCM-256 (Encrypted)' },
    { value: 'AES-CBC-256', label: 'AES-CBC-256 (Encrypted)' },
    { value: 'ChaCha20-Poly1305', label: 'ChaCha20-Poly1305 (Encrypted)' },
    { value: 'none', label: 'None (No Encryption)' }
  ];

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      if (this.peerService.peerId && this.peerService.peerId !== user.id) {
        this.peerService.destroy();
      }
      this.peerService.initializePeer(user.id);
    }
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  async createRoom(): Promise<void> {
    if (this.roomType === 'chat' && !this.newRoomName.trim()) {
      this.alertService.showError('Error', 'Please enter a room name');
      return;
    }

    const name = this.roomType === 'meeting' ? (this.newRoomName.trim() || 'Meeting') : this.newRoomName;
    const room = this.roomService.createRoom(this.roomType, name, this.encryptionAlgo);
    if (this.encryptionAlgo !== 'none') {
      await this.encryptionService.generateRoomKey(this.encryptionAlgo);
    }

    if (this.roomType === 'meeting') {
      this.router.navigate(['/meeting', room.id]);
    } else {
      this.chatRooms.update(rooms => [...rooms, room]);
      this.newRoomName = '';
    }
  }

  async joinRoom(): Promise<void> {
    if (!this.joinGuid.trim()) {
      this.alertService.showError('Error', 'Please enter a room GUID');
      return;
    }

    const guid = this.joinGuid.trim();
    this.joinGuid = '';
    this.joiningRoomId = guid;
    this.joiningState.set('waiting');

    try {
      const user = this.authService.currentUser();
      if (!user) throw new Error('User not authenticated');
      const result = await this.roomService.joinRoomAndWait(user.id, guid);

      this.joiningState.set('idle');
      this.joiningRoomId = '';

      if (result.approved && result.type === 'meeting') {
        this.router.navigate(['/meeting', guid]);
      } else if (result.approved && result.type === 'chat') {
        this.router.navigate(['/chat', guid]);
      } else {
        this.alertService.showError('Access Denied', 'The host denied your join request.');
      }
    } catch (err) {
      this.joiningState.set('idle');
      this.joiningRoomId = '';
      if (String(err) !== 'Error: Cancelled') {
        this.alertService.showError('Failed to join room', String(err));
      }
    }
  }

  cancelJoinRequest(): void {
    this.roomService.cancelJoinRequest(this.joiningRoomId);
    this.joiningState.set('idle');
    this.joiningRoomId = '';
  }

  async scanQrCode(): Promise<void> {
    this.showQrScanner.set(true);

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      this.qrCodeReader = new Html5Qrcode('qr-reader');
      await this.qrCodeReader.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          this.joinGuid = decodedText;
          this.stopScanner();
          this.joinRoom();
        },
        () => { }
      );
    } catch {
      this.alertService.showError('Camera Error', 'Could not access camera. Please check permissions.');
      this.showQrScanner.set(false);
    }
  }

  stopScanner(): void {
    if (this.qrCodeReader) {
      this.qrCodeReader.stop().catch(() => { });
      this.qrCodeReader = null;
    }
    this.showQrScanner.set(false);
  }

  leaveChatRoom(roomId: string): void {
    const rooms = this.chatRooms().filter(r => r.id !== roomId);
    this.chatRooms.set(rooms);
  }
}
