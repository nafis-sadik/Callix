import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/services/room.service';
import { PeerService } from '../../../core/services/peer.service';
import { AuthService } from '../../../core/services/auth.service';
import { RecordingService } from '../../../core/services/recording.service';
import { MediaSyncService } from '../../../core/services/media-sync.service';
import { FileTransferService } from '../../../core/services/file-transfer.service';
import { AlertService } from '../../../core/services/alert.service';

import { SharedFile } from '../../../core/models/room.model';
import { PeerMessage } from '../../../core/models/peer-message.model';
import { QrCodeModalComponent } from '../../../shared/components/qr-code-modal/qr-code-modal.component';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MediaPlayerModalComponent } from '../components/media-player-modal/media-player-modal.component';
import { VideoSettingsModalComponent } from '../components/video-settings-modal/video-settings-modal.component';
import { ParticipantsPanelComponent } from '../components/participants-panel/participants-panel.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { TooltipModule } from 'primeng/tooltip';

export interface VideoResolution {
  label: string;
  width: number;
  height: number;
}

export const RESOLUTION_PRESETS: VideoResolution[] = [
  { label: '480p (SD)',      width: 640,  height: 480 },
  { label: '720p (HD)',      width: 1280, height: 720 },
  { label: '1080p (Full HD)', width: 1920, height: 1080 },
  { label: '1440p (QHD)',    width: 2560, height: 1440 },
  { label: '4K (UHD)',       width: 3840, height: 2160 },
];

const STORAGE_KEY = 'callix-video-settings';

export interface VideoSettings {
  custom: boolean;
  resolutionIndex: number;
}

@Component({
  selector: 'app-meeting-room',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    QrCodeModalComponent, FileUploadComponent,
    MediaPlayerModalComponent, VideoSettingsModalComponent,
    ParticipantsPanelComponent,
    TimeAgoPipe, TooltipModule
  ],
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
  fileTransferService = inject(FileTransferService);
  alertService = inject(AlertService);

  roomId = signal<string>('');
  isHost = signal<boolean>(false);
  showChat = signal<boolean>(true);
  showParticipants = signal<boolean>(false);
  showRoomInfo = signal<boolean>(false);
  showMediaPlayer = signal<boolean>(false);
  showVideoSettings = signal<boolean>(false);
  carouselCollapsed = signal<boolean>(true);
  mediaUrl = signal<string>('');
  messageText = signal<string>('');
  activeSpeakerId = signal<string | null>(null);
  pinnedParticipantId = signal<string | null>(null);

  videoSettings = signal<VideoSettings>(this.loadSettings());
  resolutionPresets = RESOLUTION_PRESETS;

  micOn = signal<boolean>(true);
  cameraOn = signal<boolean>(true);
  screenSharing = signal<boolean>(false);
  recording = signal<boolean>(false);

  localStream = signal<MediaStream | null>(null);
  screenStream = signal<MediaStream | null>(null);
  remoteStreams = signal<{ peerId: string, stream: MediaStream }[]>([]);

  constructor() {
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

    this.peerService.onIncomingCall$.subscribe(({ peerId, call }) => {
      const stream = this.localStream();
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
    this.initMedia();
  }

  async initMedia(): Promise<void> {
    try {
      const settings = this.videoSettings();
      const constraints: MediaStreamConstraints = { audio: true };

      if (settings.custom) {
        const res = RESOLUTION_PRESETS[settings.resolutionIndex];
        constraints.video = {
          width: { ideal: res.width },
          height: { ideal: res.height },
        };
      } else {
        constraints.video = { width: { ideal: 1280 }, height: { ideal: 720 } };
      }

      const rawStream = await navigator.mediaDevices.getUserMedia(constraints);

      this.localStream.set(rawStream);
    } catch (err) {
      console.error('Failed to get media:', err);
    }
  }

  async applyVideoSettings(): Promise<void> {
    const settings = this.videoSettings();
    this.saveSettings(settings);

    if (!this.localStream()) {
      this.initMedia();
      this.showVideoSettings.set(false);
      return;
    }

    const prevAudio = this.localStream()!.getAudioTracks()[0];
    const audioEnabled = prevAudio?.enabled ?? true;
    const videoEnabled = this.cameraOn();

    this.localStream()!.getTracks().forEach(t => t.stop());

    try {
      const constraints: MediaStreamConstraints = { audio: true };
      if (settings.custom) {
        const res = RESOLUTION_PRESETS[settings.resolutionIndex];
        constraints.video = { width: { ideal: res.width }, height: { ideal: res.height } };
      } else {
        constraints.video = { width: { ideal: 1280 }, height: { ideal: 720 } };
      }

      const rawStream = await navigator.mediaDevices.getUserMedia(constraints);
      rawStream.getAudioTracks()[0].enabled = audioEnabled;
      this.micOn.set(audioEnabled);
      rawStream.getVideoTracks()[0].enabled = videoEnabled;
      this.cameraOn.set(videoEnabled);
      this.localStream.set(rawStream);

      this.peerService.closeMediaConnections();

      const peers = this.roomService.participants()
        .filter(p => p.id !== this.authService.currentUser()?.id)
        .map(p => p.peerId);

      for (const peerId of peers) {
        this.peerService.callPeer(peerId, this.localStream()!);
      }
    } catch (err) {
      console.error('Failed to reinitialize media:', err);
    }

    this.showVideoSettings.set(false);
  }

  private loadSettings(): VideoSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { custom: false, resolutionIndex: 2, ...parsed };
      }
    } catch {}
    return { custom: false, resolutionIndex: 2 };
  }

  private saveSettings(s: VideoSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {}
  }

  getBigScreenStream(): MediaStream | null {
    const pinned = this.pinnedParticipantId();
    if (pinned) {
      const found = this.remoteStreams().find(r => r.peerId === pinned);
      if (found) return found.stream;
    }
    const active = this.activeSpeakerId();
    if (active) {
      const found = this.remoteStreams().find(r => r.peerId === active);
      if (found) return found.stream;
    }
    if (this.remoteStreams().length > 0) {
      return this.remoteStreams()[0].stream;
    }
    return null;
  }

  toggleMic(): void {
    const stream = this.localStream();
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      this.micOn.update(v => !v);
    }
  }

  toggleCamera(): void {
    const stream = this.localStream();
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
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
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      this.screenStream.set(stream);
      this.screenSharing.set(true);

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
    const stream = this.screenStream();
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      this.screenStream.set(null);
      this.screenSharing.set(false);

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

  async toggleRecording(): Promise<void> {
    if (this.recording()) {
      const blob = await this.recordingService.stopRecording();
      if (blob) {
        this.recordingService.downloadRecording(blob);
      }
      this.recording.set(false);
    } else {
      const stream = this.localStream() || this.screenStream();
      if (stream) {
        this.recordingService.startRecording(stream);
        this.recording.set(true);
      }
    }
  }

  pinParticipant(peerId: string): void {
    this.pinnedParticipantId.update(v => v === peerId ? null : peerId);
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

  sendMessageOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  async onFileSelected(file: File): Promise<void> {
    try {
      if (file.size > this.fileTransferService.LARGE_FILE_THRESHOLD) {
        const confirmed = await this.alertService.showLargeFileWarning(file.name, file.size);
        if (confirmed) {
          await this.sendFile(file);
        }
      } else {
        await this.sendFile(file);
      }
    } catch (err) {
      console.error('File transfer failed:', err);
    }
  }

  private async sendFile(file: File): Promise<void> {
    const user = this.authService.currentUser();
    if (!user) return;

    const peers = this.roomService.participants()
      .filter(p => p.id !== user.id)
      .map(p => p.peerId);

    if (peers.length > 0) {
      await this.fileTransferService.sendFile(file, peers, user.id);
    }
  }

  insertEmoji(emoji: string): void {
    this.messageText.update(v => v + emoji);
  }

  leaveRoom(): void {
    this.roomService.leaveRoom();
    this.stopMedia();
    this.router.navigate(['/home']);
  }

  private stopMedia(): void {
    const local = this.localStream();
    if (local) {
      local.getTracks().forEach(t => t.stop());
      this.localStream.set(null);
    }
    const screen = this.screenStream();
    if (screen) {
      screen.getTracks().forEach(t => t.stop());
      this.screenStream.set(null);
    }
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

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.alertService.showSuccess('Copied!', 'Room ID copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  closeRoomInfo = () => {
    this.showRoomInfo.set(false);
  };

  downloadFile(file: SharedFile): void {
    if (file.data) {
      const blob = new Blob([file.data], { type: file.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}