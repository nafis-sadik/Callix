import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { AuthService } from '../../core/services/auth.service';
import { PeerService } from '../../core/services/peer.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TooltipModule, TimeAgoPipe],
  templateUrl: './chat-room.html',
  styleUrl: './chat-room.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  roomService = inject(RoomService);
  authService = inject(AuthService);
  private peerService = inject(PeerService);

  messageText = signal('');
  roomName = signal('');
  currentUserId = signal('');

  ngOnInit(): void {
    const room = this.roomService.currentRoom();
    if (!room) {
      this.router.navigate(['/home']);
      return;
    }
    this.roomName.set(room.name);
    this.currentUserId.set(this.authService.currentUser()?.id ?? '');
  }

  ngOnDestroy(): void {
    this.roomService.leaveRoom();
    const user = this.authService.currentUser();
    if (user) {
      this.peerService.initializePeer(user.id);
    }
  }

  sendMessage(): void {
    const text = this.messageText().trim();
    if (!text) return;
    this.roomService.addMessage(text, 'text');
    this.messageText.set('');
  }

  leaveRoom(): void {
    this.roomService.leaveRoom();
    this.router.navigate(['/home']);
  }
}
