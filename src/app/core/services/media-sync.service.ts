import { Injectable } from '@angular/core';
import { PeerService } from './peer.service';
import { PeerMessage } from '../models/peer-message.model';

@Injectable({ providedIn: 'root' })
export class MediaSyncService {
  constructor(private peerService: PeerService) {}

  startMediaPlayback(url: string): void {
    const msg: PeerMessage = {
      type: 'media-sync',
      payload: { action: 'load', url, currentTime: 0 },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };
    this.peerService.broadcastMessage(msg);
  }

  syncPlayback(action: 'play' | 'pause' | 'seek', currentTime: number): void {
    const msg: PeerMessage = {
      type: 'media-sync',
      payload: { action, currentTime },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };
    this.peerService.broadcastMessage(msg);
  }

  stopMediaPlayback(): void {
    const msg: PeerMessage = {
      type: 'media-sync',
      payload: { action: 'stop' },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };
    this.peerService.broadcastMessage(msg);
  }
}
