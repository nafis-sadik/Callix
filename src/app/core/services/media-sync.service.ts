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
    this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast media sync:', err));
  }

  syncPlayback(action: 'play' | 'pause' | 'seek', currentTime: number): void {
    const msg: PeerMessage = {
      type: 'media-sync',
      payload: { action, currentTime },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };
    this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast sync playback:', err));
  }

  stopMediaPlayback(): void {
    const msg: PeerMessage = {
      type: 'media-sync',
      payload: { action: 'stop' },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };
    this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast stop media:', err));
  }
}
