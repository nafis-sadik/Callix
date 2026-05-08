import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/services/room.service';
import { PeerService } from '../../../core/services/peer.service';
import { AuthService } from '../../../core/services/auth.service';
import { RecordingService } from '../../../core/services/recording.service';
import { MediaSyncService } from '../../../core/services/media-sync.service';
import { AlertService } from '../../../core/services/alert.service';
import { User, Room } from '../../../core/models/room.model';
import { PeerMessage } from '../../../core/models/peer-message.model';

@Component({
  selector: 'app-meeting-room',
  standalone: true,
  imports: [CommonModule, FormsModule, SlicePipe],
  templateUrl: './meeting-room.html',
  styleUrl: './meeting-room.scss',
})
export class MeetingRoomComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  roomService = inject(RoomService);
  peerService = inject(PeerService);
  authService = inject(AuthService);
  recordingService = inject(RecordingService);
  mediaSyncService = inject(MediaSyncService);
  alertService = inject(AlertService);

  roomId = signal<string>('');
  isHost = signal<boolean>(false);
  showChat = signal<boolean>(true);
  showParticipants = signal<boolean>(false);
  showJoinRequests = signal<boolean>(false);
  showBanList = signal<boolean>(false);
  showRoomInfo = signal<boolean>(false);
  showMediaPlayer = signal<boolean>(false);
  mediaUrl = signal<string>('');
  messageText = signal<string>('');
  
  micOn = signal<boolean>(true);
  cameraOn = signal<boolean>(true);
  screenSharing = signal<boolean>(false);
  recording = signal<boolean>(false);

  localStream: MediaStream | null = null;
  screenStream: MediaStream | null = null;
  remoteStreams = signal<{ peerId: string, stream: MediaStream }[]>([]);

  constructor() {
    // Listen for remote streams
    this.peerService.onRemoteStream$.subscribe(({ peerId, stream }) => {
      const current = this.remoteStreams();
      const existing = current.findIndex(r => r.peerId === peerId);
      if (existing >= 0) {
        current[existing] = { peerId, stream };
      } else {
        current.push({ peerId, stream });
      }
      this.remoteStreams.set([...current]);
    });

    // Listen for incoming calls
    this.peerService.onIncomingCall$.subscribe(({ peerId, call }) => {
      const stream = this.localStream || null;
      if (stream) {
        this.peerService.answerCall(call, stream);
      }
    });
  }

  currentUserId(): string | undefined {
    return this.authService.currentUser()?.id;
  }

  ngOnInit(): void {
    this.roomId.set(this.route.snapshot.paramMap.get('roomId') || '');
    this.isHost.set(this.roomService.isHost());
    
    // Initialize media
    this.initMedia();
  }

  async initMedia(): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
    } catch (err) {
      console.error('Failed to get media:', err);
    }
  }

  toggleMic(): void {
    if (!this.localStream) return;
    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.micOn.update(v => !v);
    }
  }

  toggleCamera(): void {
    if (!this.localStream) return;
    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      this.cameraOn.update(v => !v);
    }
  }

  async toggleScreenShare(): Promise<void> {
    if (this.screenSharing()) {
      this.stopScreenShare();
    } else {
      await this.startScreenShare();
    }
  }

  async startScreenShare(): Promise<void> {
    try {
      this.screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      this.screenSharing.set(true);
      
      // Broadcast screen share start
      const msg = {
        type: 'screen-share-start',
        payload: {},
        timestamp: Date.now(),
        senderId: this.authService.currentUser()?.id || '',
        encrypted: false
      } as PeerMessage;
      this.peerService.broadcastMessage(msg);
    } catch (err) {
      console.error('Failed to start screen share:', err);
    }
  }

  stopScreenShare(): void {
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(t => t.stop());
      this.screenStream = null;
      this.screenSharing.set(false);
      
      // Broadcast screen share stop
      const msg = {
        type: 'screen-share-stop',
        payload: {},
        timestamp: Date.now(),
        senderId: this.authService.currentUser()?.id || '',
        encrypted: false
      } as PeerMessage;
      this.peerService.broadcastMessage(msg);
    }
  }

  toggleRecording(): void {
    if (this.recording()) {
      const blob = this.recordingService.stopRecording();
      if (blob) {
        this.recordingService.downloadRecording(blob);
      }
      this.recording.set(false);
    } else {
      const stream = this.localStream || this.screenStream;
      if (stream) {
        this.recordingService.startRecording(stream);
        this.recording.set(true);
      }
    }
  }

  toggleMediaPlayer(): void {
    this.showMediaPlayer.update(v => !v);
  }

  loadMedia(): void {
    if (this.mediaUrl().trim()) {
      this.mediaSyncService.startMediaPlayback(this.mediaUrl());
      this.showMediaPlayer.set(true);
    }
  }

  sendMessage(): void {
    const text = this.messageText().trim();
    if (!text) return;
    
    this.roomService.addMessage(text);
    this.messageText.set('');
  }

  sendMessageOnEnter(event: Event): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.sendMessage();
    }
  }

  leaveRoom(): void {
    this.roomService.leaveRoom();
    this.stopMedia();
    this.router.navigate(['/home']);
  }

  private stopMedia(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(t => t.stop());
      this.screenStream = null;
    }
    // Clear remote streams
    this.remoteStreams.set([]);
  }

  approveRequest(userId: string): void {
    this.roomService.approveRequest(userId);
  }

  denyRequest(userId: string): void {
    this.roomService.denyRequest(userId);
  }

  kickParticipant(userId: string): void {
    this.roomService.kickParticipant(userId);
  }

  unbanUser(userId: string): void {
    this.roomService.unbanUser(userId);
  }

  unbanAll(): void {
    this.roomService.unbanAll();
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }
}
