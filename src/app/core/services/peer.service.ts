import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Peer from 'peerjs';
import { EncryptionService } from './encryption.service';
import { PeerMessage } from '../models/peer-message.model';

@Injectable({ providedIn: 'root' })
export class PeerService {
  private peer: Peer | null = null;
  private dataConnections = new Map<string, any>();
  private mediaConnections = new Map<string, any>();
  private remoteStreams = new Map<string, MediaStream>();

  peerId$ = new Subject<string>();
  onMessage$ = new Subject<PeerMessage>();
  onIncomingConnection$ = new Subject<string>();
  onIncomingCall$ = new Subject<{ peerId: string, call: any }>();
  onRemoteStream$ = new Subject<{ peerId: string, stream: MediaStream }>();

  private peerIdValue: string | null = null;

  get peerId(): string | null {
    return this.peerIdValue;
  }

  constructor(private encryptionService: EncryptionService) {}

  initializePeer(userId: string): void {
    if (this.peer) {
      this.destroy();
    }
    this.peer = new Peer(userId, {
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      }
    });

    this.peer.on('open', (id) => {
      this.peerIdValue = id;
      this.peerId$.next(id);
      console.log('Peer connected with ID:', id);
    });

    this.peer.on('connection', (conn) => {
      this.handleIncomingDataConnection(conn);
    });

    this.peer.on('call', (call) => {
      this.onIncomingCall$.next({ peerId: call.peer, call });
    });

    this.peer.on('error', (err) => {
      console.error('Peer error:', err);
    });
  }

  connectToPeer(peerId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.peer) {
        reject(new Error('Peer not initialized'));
        return;
      }

      const conn = this.peer.connect(peerId);

      conn.on('open', () => {
        this.dataConnections.set(peerId, conn);
        this.setupDataConnectionListeners(conn, peerId);
        resolve();
      });

      conn.on('error', (err: any) => {
        console.error('Connection error:', err);
        reject(err);
      });
    });
  }

  private handleIncomingDataConnection(conn: any): void {
    this.dataConnections.set(conn.peer, conn);
    this.setupDataConnectionListeners(conn, conn.peer);
    this.onIncomingConnection$.next(conn.peer);
  }

  private setupDataConnectionListeners(conn: any, peerId: string): void {
    conn.on('data', (data: any) => {
      try {
        const message: PeerMessage = JSON.parse(data);
        if (message.encrypted) {
          this.encryptionService.decrypt(message.payload).then(decrypted => {
            message.payload = JSON.parse(decrypted);
            message.encrypted = false;
            this.onMessage$.next(message);
          });
        } else {
          this.onMessage$.next(message);
        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    });

    conn.on('close', () => {
      this.dataConnections.delete(peerId);
    });
  }

  async sendMessage(peerId: string, message: PeerMessage): Promise<void> {
    const conn = this.dataConnections.get(peerId);
    if (!conn) throw new Error(`No connection to peer ${peerId}`);

    if (message.encrypted) {
      const encryptedPayload = await this.encryptionService.encrypt(
        typeof message.payload === 'string' ? message.payload : JSON.stringify(message.payload)
      );
      message.payload = encryptedPayload;
    }

    conn.send(JSON.stringify(message));
  }

  async broadcastMessage(message: PeerMessage): Promise<void> {
    const promises = Array.from(this.dataConnections.keys()).map(
      peerId => this.sendMessage(peerId, { ...message })
    );
    await Promise.allSettled(promises);
  }

  callPeer(peerId: string, stream: MediaStream): void {
    if (!this.peer) return;
    const call = this.peer.call(peerId, stream);
    this.mediaConnections.set(peerId, call);

    call.on('stream', (remoteStream: MediaStream) => {
      this.remoteStreams.set(peerId, remoteStream);
      this.onRemoteStream$.next({ peerId, stream: remoteStream });
    });

    call.on('close', () => {
      this.mediaConnections.delete(peerId);
      this.remoteStreams.delete(peerId);
    });
  }

  answerCall(call: any, stream: MediaStream): void {
    call.answer(stream);

    call.on('stream', (remoteStream: MediaStream) => {
      const peerId = call.peer;
      this.remoteStreams.set(peerId, remoteStream);
      this.onRemoteStream$.next({ peerId, stream: remoteStream });
    });

    call.on('close', () => {
      this.remoteStreams.delete(call.peer);
    });
  }

  getRemoteStream(peerId: string): MediaStream | undefined {
    return this.remoteStreams.get(peerId);
  }

  getAllRemoteStreams(): { peerId: string, stream: MediaStream }[] {
    return Array.from(this.remoteStreams.entries()).map(([peerId, stream]) => ({ peerId, stream }));
  }

  getConnectedPeers(): string[] {
    return Array.from(this.dataConnections.keys());
  }

  disconnectFromPeer(peerId: string): void {
    const dataConn = this.dataConnections.get(peerId);
    if (dataConn) {
      dataConn.close();
      this.dataConnections.delete(peerId);
    }

    const mediaConn = this.mediaConnections.get(peerId);
    if (mediaConn) {
      mediaConn.close();
      this.mediaConnections.delete(peerId);
    }
  }

  destroy(): void {
    this.dataConnections.forEach(conn => conn.close());
    this.mediaConnections.forEach(conn => conn.close());
    this.dataConnections.clear();
    this.mediaConnections.clear();
    this.remoteStreams.clear();

    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.peerIdValue = null;
  }

  isConnectedTo(peerId: string): boolean {
    return this.dataConnections.has(peerId);
  }
}
