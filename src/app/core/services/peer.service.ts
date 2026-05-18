import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import Peer from 'peerjs';
import { EncryptionService } from './encryption.service';
import { LoggerService } from './logger.service';
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
  onDisconnected$ = new Subject<string>();

  private peerIdValue: string | null = null;
  private peerReady = false;
  private peerReadyResolver: (() => void) | null = null;
  private peerReadyPromise: Promise<void>;
  private logger = inject(LoggerService);

  get peerId(): string | null {
    return this.peerIdValue;
  }

  constructor(private encryptionService: EncryptionService) {
    this.peerReadyPromise = new Promise((resolve) => {
      this.peerReadyResolver = resolve;
    });
  }

  initializePeer(userId: string): Promise<void> {
    if (this.peer) {
      this.destroy();
    }

    this.peerReady = false;
    this.peerReadyPromise = new Promise((resolve) => {
      this.peerReadyResolver = resolve;
    });

    this.peer = new Peer(userId, {
      debug: 1,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
          { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
          { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' }
        ]
      }
    });

    this.peer.on('open', (id) => {
      this.peerIdValue = id;
      this.peerId$.next(id);
      this.peerReady = true;
      this.peerReadyResolver?.();
      this.logger.peerInitialized(id);
    });

    this.peer.on('connection', (conn) => {
      this.logger.connectionAccepted('Local Peer', conn.peer, { connectionType: 'data' });
      this.handleIncomingDataConnection(conn);
    });

    this.peer.on('call', (call) => {
      this.logger.mediaCallReceived(call.peer);
      this.onIncomingCall$.next({ peerId: call.peer, call });
    });

    this.peer.on('error', (err) => {
      this.logger.log('error', 'Peer error', { error: err.message || String(err), type: err.type }, { group: true });
      console.error('Peer error:', err);
    });

    return this.peerReadyPromise;
  }

  async connectToPeer(userId: string, peerId: string): Promise<void> {
    if (!this.peer || !this.peerReady) {
      await this.initializePeer(userId);
    }

    this.logger.connection('Local Peer', peerId, { action: 'initiating connection' });

    return new Promise((resolve, reject) => {
      const conn = this.peer?.connect(peerId);

      if (!conn) {
        this.logger.log('error', 'Connection failed', { peerId, error: 'No connection' }, { group: true });
        reject(new Error('No connection to peer ' + peerId));
        return;
      }

      conn.on('open', () => {
        this.dataConnections.set(peerId, conn);
        this.setupDataConnectionListeners(conn, peerId);
        this.logger.connection('Local Peer', peerId, { status: 'connected', connectionType: 'data' });
        this.logger.connectedPeersList(Array.from(this.dataConnections.keys()));
        resolve();
      });

      conn.on('error', (err: any) => {
        this.logger.log('error', 'Connection failed', { peerId, error: err.message || String(err) }, { group: true });
        console.error('Connection error:', err);
        reject(err);
      });
    });
  }

  private handleIncomingDataConnection(conn: any): void {
    this.dataConnections.set(conn.peer, conn);
    this.setupDataConnectionListeners(conn, conn.peer);
    this.logger.connectedPeersList(Array.from(this.dataConnections.keys()));
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
            this.logger.messageReceived(message.senderId || peerId, message.type, message.payload);
            this.onMessage$.next(message);
          });
        } else {
          this.logger.messageReceived(message.senderId || peerId, message.type, message.payload);
          this.onMessage$.next(message);
        }
      } catch (err) {
        this.logger.log('error', 'Error processing message', {
          peerId, error: err instanceof Error ? err.message : String(err)
        }, { group: true });
        console.error('Error processing message:', err);
      }
    });

    conn.on('close', () => {
      this.dataConnections.delete(peerId);
      this.logger.disconnection('Local Peer', peerId, {
        connectionType: 'data',
        reason: 'connection closed by peer'
      });
      this.logger.connectedPeersList(Array.from(this.dataConnections.keys()));
      this.onDisconnected$.next(peerId);
    });
  }

  async sendMessage(peerId: string, message: PeerMessage): Promise<void> {
    const conn = this.dataConnections.get(peerId);
    if (!conn) {
      this.logger.log('error', 'sendMessage failed - no connection', { peerId, messageType: message.type }, { group: true });
      throw new Error(`No connection to peer ${peerId}`);
    }

    this.logger.messageSent(peerId, message.type, message.payload);

    const msg = { ...message };
    if (msg.encrypted) {
      msg.payload = await this.encryptionService.encrypt(
        typeof msg.payload === 'string' ? msg.payload : JSON.stringify(msg.payload)
      );
    }

    conn.send(JSON.stringify(msg));
  }

  async broadcastMessage(message: PeerMessage): Promise<void> {
    const peerIds = Array.from(this.dataConnections.keys());
    this.logger.log('message', `BROADCAST to ${peerIds.length} peers`, {
      type: message.type,
      recipients: peerIds
    }, { group: true, collapsed: true });

    const promises = peerIds.map(peerId =>
      this.sendMessage(peerId, { ...message, payload: { ...message.payload } })
    );
    await Promise.allSettled(promises);
  }

  callPeer(peerId: string, stream: MediaStream): void {
    if (!this.peer) return;
    this.logger.mediaCallInitiated(peerId);
    const call = this.peer.call(peerId, stream);
    this.mediaConnections.set(peerId, call);

    call.on('stream', (remoteStream: MediaStream) => {
      this.logger.remoteStreamReceived(peerId);
      this.remoteStreams.set(peerId, remoteStream);
      this.onRemoteStream$.next({ peerId, stream: remoteStream });
    });

    call.on('close', () => {
      this.logger.mediaCallClosed(peerId);
      this.mediaConnections.delete(peerId);
      this.remoteStreams.delete(peerId);
    });
  }

  answerCall(call: any, stream: MediaStream): void {
    this.logger.mediaCallAnswered(call.peer);
    call.answer(stream);

    call.on('stream', (remoteStream: MediaStream) => {
      const peerId = call.peer;
      this.logger.remoteStreamReceived(peerId);
      this.remoteStreams.set(peerId, remoteStream);
      this.onRemoteStream$.next({ peerId, stream: remoteStream });
    });

    call.on('close', () => {
      this.logger.mediaCallClosed(call.peer);
      this.remoteStreams.delete(call.peer);
    });
  }

  getRemoteStream(peerId: string): MediaStream | undefined {
    return this.remoteStreams.get(peerId);
  }

  getAllRemoteStreams(): { peerId: string, stream: MediaStream }[] {
    return Array.from(this.remoteStreams.entries()).map(([peerId, stream]) => ({ peerId, stream }));
  }

  closeMediaConnections(): void {
    this.mediaConnections.forEach((call) => {
      try { call.close(); } catch { /* connection may already be closed */ }
    });
    this.mediaConnections.clear();
    this.remoteStreams.clear();
  }

  getConnectedPeers(): string[] {
    return Array.from(this.dataConnections.keys());
  }

  disconnectFromPeer(peerId: string): void {
    this.logger.disconnection('Local Peer', peerId, { action: 'manual disconnect' });

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
    const dataPeers = Array.from(this.dataConnections.keys());
    const mediaPeers = Array.from(this.mediaConnections.keys());

    if (dataPeers.length > 0 || mediaPeers.length > 0) {
      this.logger.log('disconnection', 'Closing all connections', {
        dataConnections: dataPeers,
        mediaConnections: mediaPeers
      }, { group: true });
    }

    this.dataConnections.forEach(conn => conn.close());
    this.mediaConnections.forEach(conn => conn.close());
    this.dataConnections.clear();
    this.mediaConnections.clear();
    this.remoteStreams.clear();

    if (this.peer) {
      this.logger.peerDestroyed();
      this.peer.destroy();
      this.peer = null;
    }
    this.peerIdValue = null;
    this.peerReady = false;

    this.peerReadyPromise = new Promise((resolve) => {
      this.peerReadyResolver = resolve;
    });
  }

  isConnectedTo(peerId: string): boolean {
    return this.dataConnections.has(peerId);
  }
}
