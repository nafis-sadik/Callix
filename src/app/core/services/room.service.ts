import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PeerService } from './peer.service';
import { EncryptionService } from './encryption.service';
import { AuthService } from './auth.service';
import { FileTransferService } from './file-transfer.service';
import { AlertService } from './alert.service';
import { LoggerService } from './logger.service';
import { User, Room, RoomType, EncryptionAlgorithm, JoinRequest, Message, SharedFile, HistorySyncPayload } from '../models/room.model';
import { PeerMessage, PeerMessageType } from '../models/peer-message.model';
import { v4 as uuidv4 } from 'uuid';

export interface JoinResult {
  approved: boolean;
  type?: RoomType;
  roomId?: string;
  roomName?: string;
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  currentRoom = signal<Room | null>(null);
  participants = signal<User[]>([]);
  messages = signal<Message[]>([]);
  sharedFiles = signal<SharedFile[]>([]);
  pendingRequests = signal<JoinRequest[]>([]);
  banList = signal<string[]>([]);
  isHost = signal<boolean>(false);
  pendingKicks = signal<string[]>([]);

  private router = inject(Router);
  private joinRequests = new Map<string, { resolve: (result: JoinResult) => void; reject: (err: Error) => void }>();
  private peerService = inject(PeerService);
  private encryptionService = inject(EncryptionService);
  private authService = inject(AuthService);
  private fileTransferService = inject(FileTransferService);
  private alertService = inject(AlertService);
  private logger = inject(LoggerService);
  private kickTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  private isBeingKicked = false;

  constructor() {
    this.setupMessageListeners();
    this.setupDisconnectListener();
  }

  private setupMessageListeners(): void {
    this.peerService.onMessage$.subscribe((message) => {
      try {
        if (!message) return;
        this.handlePeerMessage(message);
      } catch (err) {
        console.error('Error handling peer message:', err);
      }
    });
  }

  private setupDisconnectListener(): void {
    this.peerService.onDisconnected$.subscribe((peerId) => {
      const room = this.currentRoom();
      if (!room) return;

      if (this.isHost()) {
        const disconnectedParticipant = Array.from(room.participants.values()).find(p => p.peerId === peerId);
        if (disconnectedParticipant) {
          this.logger.disconnection('HOST', disconnectedParticipant.displayName || peerId, {
            userId: disconnectedParticipant.id,
            peerId: peerId
          });
        }
      }

      if (peerId === room.id) {
        this.handleKickedImplicit();
      }
    });
  }

  private createPeerMessage(type: PeerMessageType, payload: any, senderId: string): PeerMessage {
    return {
      type,
      payload,
      timestamp: Date.now(),
      senderId,
      encrypted: false
    };
  }

  private handlePeerMessage(message: PeerMessage): void {
    if (!message || !message.payload) return;
    switch (message.type) {
      case 'chat':
        this.addMessage(message.payload, 'text', true);
        break;
      case 'join-request':
        this.handleJoinRequest(message);
        break;
      case 'join-response':
        this.handleJoinResponse(message);
        break;
      case 'participant-update':
        this.handleParticipantUpdate(message.payload);
        break;
      case 'kick':
        this.handleKicked(message);
        break;
      case 'kick-confirmation':
        this.handleKickConfirmation(message);
        break;
      case 'ban':
        this.addToBanList(message.payload);
        break;
      case 'unban':
        this.removeFromBanList(message.payload);
        break;
      case 'ban-list-sync':
        this.handleBanListSync(message.payload);
        break;
      case 'room-destroyed':
        this.handleRoomDestroyed();
        break;
      case 'file-meta':
        this.fileTransferService.handleFileMeta(message.payload);
        break;
      case 'file-chunk':
        this.fileTransferService.handleFileChunk(message.payload);
        break;
      case 'file-complete':
        this.handleFileComplete(message);
        break;
      case 'history-sync':
        this.handleHistorySync(message.payload);
        break;
      case 'key-exchange':
        this.handleKeyExchange(message);
        break;
      case 'key-exchange-response':
        this.handleKeyExchangeResponse(message);
        break;
    }
  }

  createRoom(type: RoomType, name: string, algorithm: EncryptionAlgorithm = 'AES-GCM-256'): Room {
    const user = this.authService.currentUser();
    if (!user) throw new Error('User not authenticated');

    const roomId = uuidv4();
    const room: Room = {
      id: roomId,
      type,
      name,
      hostId: user.id,
      encryptionAlgorithm: algorithm,
      participants: new Map(),
      banList: new Set(),
      pendingRequests: new Map(),
      messages: [],
      sharedFiles: [],
      createdAt: Date.now()
    };

    this.logger.hostCreatedRoom(roomId, name);

    this.peerService.destroy();
    this.peerService.initializePeer(roomId);

    room.participants.set(user.id, {
      id: user.id,
      displayName: user.displayName,
      peerId: roomId,
      isHost: true
    });

    this.currentRoom.set(room);
    this.isHost.set(true);
    this.updateParticipantsFromRoom(room);
    this.logger.participantUpdate(Array.from(room.participants.values()));

    return room;
  }

  async joinRoom(userId: string, roomId: string): Promise<void> {
    try {
      this.logger.guestJoinRequestSent(roomId);
      await this.peerService.connectToPeer(userId, roomId);

      const user = this.authService.currentUser();
      if (!user) throw new Error('User not authenticated');

      const joinRequest = this.createPeerMessage('join-request', {
        userId: user.id,
        displayName: user.displayName,
        peerId: this.peerService.peerId || ''
      }, user.id);

      await this.peerService.sendMessage(roomId, joinRequest);
    } catch (err) {
      this.logger.log('error', 'Failed to join room', {
        roomId,
        error: err instanceof Error ? err.message : String(err)
      }, { group: true });
      console.error('Failed to join room:', err);
      throw err;
    }
  }

  async joinRoomAndWait(userId: string, roomId: string): Promise<JoinResult> {
    await this.joinRoom(userId, roomId);

    return new Promise<JoinResult>((resolve, reject) => {
      this.joinRequests.set(roomId, { resolve, reject });

      setTimeout(() => {
        if (this.joinRequests.has(roomId)) {
          this.logger.guestJoinDenied(roomId, 'timeout');
          this.joinRequests.delete(roomId);
          resolve({ approved: false });
        }
      }, 30000);
    });
  }

  cancelJoinRequest(roomId: string): void {
    const request = this.joinRequests.get(roomId);
    if (request) {
      request.reject(new Error('Cancelled'));
      this.joinRequests.delete(roomId);
    }
    if (this.peerService.isConnectedTo(roomId)) {
      this.peerService.disconnectFromPeer(roomId);
    }
  }

  approveRequest(userId: string): void {
    const room = this.currentRoom();
    if (!room || !this.isHost()) return;

    const request = room.pendingRequests.get(userId);
    if (!request) return;

    this.logger.hostApprovedJoin(request.userId, request.displayName);

    room.pendingRequests.delete(userId);
    room.participants.set(userId, {
      id: request.userId,
      displayName: request.displayName,
      peerId: request.peerId
    });

    this.updateParticipantsFromRoom(room);
    this.refreshCurrentRoom();
    this.updatePendingRequests(room);
    this.logger.participantUpdate(Array.from(room.participants.values()));

    const user = this.authService.currentUser();
    const response = this.createPeerMessage('join-response', {
      approved: true,
      roomId: room.id,
      roomName: room.name,
      type: room.type,
      encryptionAlgorithm: room.encryptionAlgorithm,
      hostId: room.hostId,
      createdAt: room.createdAt
    }, user?.id || '');

    this.peerService.sendMessage(request.peerId, response).catch(err => console.error('Failed to send approve response:', err));
    if (room.encryptionAlgorithm !== 'none') {
      this.initiateKeyExchange(request.peerId);
    }
    this.sendHistorySync(request.peerId);
  }

  denyRequest(userId: string): void {
    const room = this.currentRoom();
    if (!room || !this.isHost()) return;

    const request = room.pendingRequests.get(userId);
    if (!request) return;

    this.logger.hostDeniedJoin(request.userId, request.displayName);

    room.pendingRequests.delete(userId);
    this.updatePendingRequests(room);
    this.refreshCurrentRoom();

    const user = this.authService.currentUser();
    const response = this.createPeerMessage('join-response', { approved: false, roomId: room.id }, user?.id || '');

    this.peerService.sendMessage(request.peerId, response).catch(err => console.error('Failed to send deny response:', err));
  }

  approveAll(): void {
    const room = this.currentRoom();
    if (!room) return;

    const requests = Array.from(room.pendingRequests.keys());
    requests.forEach(id => this.approveRequest(id));
  }

  denyAll(): void {
    const room = this.currentRoom();
    if (!room) return;

    const requests = Array.from(room.pendingRequests.keys());
    requests.forEach(id => this.denyRequest(id));
  }

  kickParticipant(userId: string): void {
    const room = this.currentRoom();
    if (!room || !this.isHost()) return;

    const participant = room.participants.get(userId);
    if (!participant) return;

    this.logger.kickInitiated('HOST', userId);
    this.pendingKicks.update(s => [...s, userId]);

    const user = this.authService.currentUser();
    const kickMsg = this.createPeerMessage('kick', { userId }, user?.id || '');
    this.peerService.sendMessage(participant.peerId, kickMsg).catch(err => {
      this.logger.log('error', 'Failed to send kick message', {
        userId, error: err instanceof Error ? err.message : String(err)
      }, { group: true });
      console.error('Failed to send kick message:', err);
      this.completeKick(userId);
    });

    const timeoutId = setTimeout(() => {
      this.completeKick(userId);
    }, 5000);
    this.kickTimeouts.set(userId, timeoutId);
  }

  banUser(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;

    room.banList.add(userId);
    this.banList.set(Array.from(room.banList));
    this.logger.banAdded('HOST', userId, Array.from(room.banList));
    this.refreshCurrentRoom();
  }

  unbanUser(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;

    room.banList.delete(userId);
    const updatedBanList = Array.from(room.banList);
    this.banList.set(updatedBanList);
    this.logger.banRemoved('HOST', userId, updatedBanList);
    this.refreshCurrentRoom();

    if (this.isHost()) {
      const user = this.authService.currentUser();
      const msg = this.createPeerMessage('ban-list-sync', { banList: updatedBanList }, user?.id || '');
      this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast ban list:', err));
    }
  }

  unbanAll(): void {
    const room = this.currentRoom();
    if (!room) return;

    const oldBanList = Array.from(room.banList);
    room.banList.clear();
    this.banList.set([]);
    this.logger.log('ban', 'HOST UNBANNED ALL users', {
      previouslyBanned: oldBanList,
      count: oldBanList.length
    }, { group: true });
    this.refreshCurrentRoom();

    if (this.isHost()) {
      const user = this.authService.currentUser();
      const msg = this.createPeerMessage('ban-list-sync', { banList: [] }, user?.id || '');
      this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast ban list:', err));
    }
  }

  leaveRoom(): void {
    const room = this.currentRoom();
    if (!room) return;

    const user = this.authService.currentUser();
    const role = this.isHost() ? 'HOST' : 'GUEST';
    this.logger.userLeftRoom(user?.id || 'unknown', user?.displayName || 'Unknown', role);

    if (this.isHost()) {
      const participantCount = room.participants.size - 1;
      this.logger.hostDestroyedRoom(room.id, participantCount);

      const destroyMsg = this.createPeerMessage('room-destroyed', { roomId: room.id }, user?.id || '');
      this.peerService.broadcastMessage(destroyMsg).catch(err => console.error('Failed to broadcast room destroy:', err));
      this.peerService.destroy();
    } else {
      const host = Array.from(room.participants.values()).find(p => p.isHost);
      if (host) {
        this.peerService.disconnectFromPeer(host.peerId);
      }
    }

    this.resetRoom();
    this.encryptionService.clearKeys();
  }

  private resetRoom(): void {
    this.isBeingKicked = false;
    this.kickTimeouts.forEach(id => clearTimeout(id));
    this.kickTimeouts.clear();
    this.currentRoom.set(null);
    this.participants.set([]);
    this.messages.set([]);
    this.sharedFiles.set([]);
    this.pendingRequests.set([]);
    this.banList.set([]);
    this.pendingKicks.set([]);
    this.isHost.set(false);
  }

  addMessage(content: string | Message, type: 'text' | 'file' | 'system' = 'text', fromPeer = false): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const message: Message = typeof content === 'string'
      ? {
        id: uuidv4(),
        senderId: user.id,
        senderName: user.displayName,
        content,
        timestamp: Date.now(),
        type
      }
      : content;

    const room = this.currentRoom();
    if (room) {
      room.messages.push(message);
      this.messages.set([...room.messages]);
      this.refreshCurrentRoom();
    }

    if (!fromPeer && type !== 'system') {
      const msg = this.createPeerMessage('chat', message, user.id);
      this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast message:', err));
    }
  }

  addFileMessage(file: SharedFile): void {
    const participants = this.participants();
    const sender = participants.find(p => p.id === file.senderId);

    const message: Message = {
      id: file.id,
      senderId: file.senderId,
      senderName: sender?.displayName || 'Unknown',
      content: `[File] ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      timestamp: file.timestamp,
      type: 'file'
    };

    const room = this.currentRoom();
    if (room) {
      room.messages.push(message);
      room.sharedFiles.push(file);
      this.messages.set([...room.messages]);
      this.sharedFiles.set([...room.sharedFiles]);
      this.refreshCurrentRoom();
    }

    const user = this.authService.currentUser();
    if (user && file.senderId === user.id) {
      const msg = this.createPeerMessage('chat', message, user.id);
      this.peerService.broadcastMessage(msg).catch(err => console.error('Failed to broadcast file message:', err));
    }
  }

  private handleJoinRequest(message: PeerMessage): void {
    if (!this.isHost()) return;

    const room = this.currentRoom();
    if (!room) return;

    const payload = message.payload;
    this.logger.incomingJoinRequest(payload.userId, payload.displayName, payload.peerId);

    if (room.banList.has(payload.userId)) {
      this.logger.bannedUserBlocked(payload.userId, payload.peerId);
      const user = this.authService.currentUser();
      const response = this.createPeerMessage('join-response', { approved: false, reason: 'banned' }, user?.id || '');
      this.peerService.sendMessage(payload.peerId, response).catch(err => console.error('Failed to send ban response:', err));
      return;
    }

    const request: JoinRequest = {
      userId: payload.userId,
      displayName: payload.displayName,
      peerId: payload.peerId,
      timestamp: Date.now()
    };

    room.pendingRequests.set(payload.userId, request);
    this.updatePendingRequests(room);
    this.refreshCurrentRoom();
  }

  private handleJoinResponse(message: PeerMessage): void {
    const payload = message.payload;
    const roomId = payload.roomId;

    if (!payload.approved) {
      this.logger.guestJoinDenied(roomId, payload.reason || 'denied by host');
      const request = roomId ? this.joinRequests.get(roomId) : null;
      if (request) {
        this.joinRequests.delete(roomId);
        request.resolve({ approved: false, roomId });
      }
      return;
    }

    this.logger.guestJoinApproved(payload.roomId, payload.roomName);
    this.logger.guestJoinedAsGuest(payload.roomId, payload.roomName, payload.hostId || message.senderId);

    const user = this.authService.currentUser();
    if (!user) return;

    const room: Room = {
      id: payload.roomId,
      type: payload.type || 'meeting',
      name: payload.roomName || 'Room',
      hostId: payload.hostId || message.senderId,
      encryptionAlgorithm: payload.encryptionAlgorithm || 'AES-GCM-256',
      participants: new Map(),
      banList: new Set(),
      pendingRequests: new Map(),
      messages: [],
      sharedFiles: [],
      createdAt: payload.createdAt || Date.now()
    };

    room.participants.set(user.id, {
      id: user.id,
      displayName: user.displayName,
      peerId: this.peerService.peerId || user.peerId,
      isHost: false
    });

    this.currentRoom.set(room);
    this.isHost.set(false);
    this.updateParticipantsFromRoom(room);
    this.logger.participantUpdate(Array.from(room.participants.values()));
    this.addMessage('You have joined the room', 'system');

    const request = this.joinRequests.get(room.id);
    if (request) {
      this.joinRequests.delete(room.id);
      request.resolve({ approved: true, type: room.type, roomId: room.id, roomName: room.name });
    }
  }

  private async handleKicked(message: PeerMessage): Promise<void> {
    if (this.isBeingKicked) return;
    this.isBeingKicked = true;

    this.logger.kickReceived('HOST');

    const room = this.currentRoom();
    if (room) {
      const user = this.authService.currentUser();
      const confirmMsg = this.createPeerMessage('kick-confirmation', { userId: message.payload?.userId }, user?.id || '');
      this.peerService.sendMessage(room.id, confirmMsg).catch(err => console.error('Failed to send kick confirmation:', err));
    }

    await Promise.race([
      this.alertService.showKicked('You have been removed from the room.'),
      new Promise<void>(resolve => setTimeout(resolve, 15000))
    ]);
    this.peerService.destroy();
    this.resetRoom();
    this.encryptionService.clearKeys();
    this.router.navigate(['/home']);
  }

  private async handleKickedImplicit(): Promise<void> {
    if (this.isBeingKicked) return;
    this.isBeingKicked = true;

    this.logger.log('kick', 'Implicit kick detected (host disconnected)', {
      reason: 'connection to host lost'
    }, { group: true });

    const room = this.currentRoom();
    if (!room) return;
    await Promise.race([
      this.alertService.showKicked('You have been removed from the room.'),
      new Promise<void>(resolve => setTimeout(resolve, 15000))
    ]);
    this.peerService.destroy();
    this.resetRoom();
    this.encryptionService.clearKeys();
    this.router.navigate(['/home']);
  }

  private handleKickConfirmation(message: PeerMessage): void {
    const { userId } = message.payload;
    this.logger.log('kick', `Kick confirmation received from: ${userId}`, {
      userId, status: 'completing kick'
    }, { group: true });
    this.clearKickTimeout(userId);
    this.completeKick(userId);
  }

  private refreshCurrentRoom(): void {
    this.currentRoom.update(r => {
      if (!r) return r;
      return {
        ...r,
        participants: new Map(r.participants),
        banList: new Set(r.banList),
        pendingRequests: new Map(r.pendingRequests),
        messages: [...r.messages],
        sharedFiles: [...r.sharedFiles],
        mediaPlayback: r.mediaPlayback ? { ...r.mediaPlayback } : undefined
      };
    });
  }

  private clearKickTimeout(userId: string): void {
    const timeoutId = this.kickTimeouts.get(userId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.kickTimeouts.delete(userId);
    }
  }

  private handleBanListSync(payload: any): void {
    const room = this.currentRoom();
    if (!room) return;
    const banList: string[] = payload.banList || [];
    this.logger.banListSynced('HOST', banList);
    room.banList = new Set(banList);
    this.banList.set(banList);
  }

  private completeKick(userId: string): void {
    this.clearKickTimeout(userId);

    const room = this.currentRoom();
    if (!room) return;

    this.pendingKicks.update(s => s.filter(id => id !== userId));

    const participant = room.participants.get(userId);
    if (participant) {
      room.participants.delete(userId);
      this.peerService.disconnectFromPeer(participant.peerId);
    }

    this.banUser(userId);
    this.logger.kickCompleted(userId, true);
    this.updateParticipantsFromRoom(room);
    this.logger.participantUpdate(Array.from(room.participants.values()));
    this.refreshCurrentRoom();

    const user = this.authService.currentUser();
    const updateMsg = this.createPeerMessage('participant-update', {
      participants: Array.from(room.participants.values())
    }, user?.id || '');
    this.peerService.broadcastMessage(updateMsg).catch(err => console.error('Failed to broadcast participant update:', err));

    const banSyncMsg = this.createPeerMessage('ban-list-sync', {
      banList: Array.from(room.banList)
    }, user?.id || '');
    this.peerService.broadcastMessage(banSyncMsg).catch(err => console.error('Failed to broadcast ban list:', err));
  }

  private handleParticipantUpdate(payload: any): void {
    if (payload && Array.isArray(payload.participants)) {
      this.logger.participantUpdate(payload.participants);
      this.participants.set(payload.participants);
    }
  }

  private handleRoomDestroyed(): void {
    this.logger.roomDestroyedByHost();
    this.alertService.showRoomDestroyed();
    this.resetRoom();
    this.encryptionService.clearKeys();
    this.peerService.destroy();
  }

  private handleFileComplete(message: PeerMessage): void {
    this.fileTransferService.handleFileComplete(message.payload);
    const file = this.fileTransferService.getFileById(message.payload.fileId);
    if (file) {
      this.addFileMessage(file);
    }
  }

  private handleKeyExchange(message: PeerMessage): void {
    const room = this.currentRoom();
    if (!room || room.encryptionAlgorithm === 'none') return;
    const { publicKey } = message.payload;
    if (!publicKey) return;

    this.logger.keyExchangeInitiated(message.senderId);
    const hostPeerId = room.id;

    Promise.resolve().then(async () => {
      const ecdhKeyPair = await this.encryptionService.generateKeyPair();
      const hostPublicKey = await this.encryptionService.importPublicKey(publicKey);
      const sharedSecret = await this.encryptionService.deriveSharedSecret(hostPublicKey);
      await this.encryptionService.deriveRoomKeyFromShared(sharedSecret);
      this.logger.keyExchangeComplete(message.senderId);

      const myPublicKey = await this.encryptionService.exportPublicKey();
      const response = this.createPeerMessage('key-exchange-response', { publicKey: myPublicKey }, this.authService.currentUser()?.id || '');
      if (this.currentRoom()?.id !== hostPeerId) return;
      await this.peerService.sendMessage(hostPeerId, response);
    }).catch(err => {
      this.logger.log('error', 'Key exchange failed', {
        peerId: message.senderId,
        error: err instanceof Error ? err.message : String(err)
      }, { group: true });
      console.error('Key exchange failed:', err);
    });
  }

  private handleKeyExchangeResponse(message: PeerMessage): void {
    const room = this.currentRoom();
    if (!room || room.encryptionAlgorithm === 'none') return;
    const { publicKey } = message.payload;
    if (!publicKey) return;

    Promise.resolve().then(async () => {
      const peerPublicKey = await this.encryptionService.importPublicKey(publicKey);
      const sharedSecret = await this.encryptionService.deriveSharedSecret(peerPublicKey);
      await this.encryptionService.deriveRoomKeyFromShared(sharedSecret);
      this.logger.keyExchangeComplete(message.senderId);
    }).catch(err => {
      this.logger.log('error', 'Key exchange response failed', {
        peerId: message.senderId,
        error: err instanceof Error ? err.message : String(err)
      }, { group: true });
      console.error('Key exchange response failed:', err);
    });
  }

  private initiateKeyExchange(peerId: string): void {
    this.logger.keyExchangeInitiated(peerId);
    this.encryptionService.generateKeyPair().then(async () => {
      const publicKey = await this.encryptionService.exportPublicKey();
      const msg = this.createPeerMessage('key-exchange', { peerId, publicKey }, this.authService.currentUser()?.id || '');
      await this.peerService.sendMessage(peerId, msg);
    }).catch(err => {
      this.logger.log('error', 'Failed to initiate key exchange', {
        peerId,
        error: err instanceof Error ? err.message : String(err)
      }, { group: true });
      console.error('Failed to initiate key exchange:', err);
    });
  }

  private sendHistorySync(peerId: string): void {
    const room = this.currentRoom();
    if (!room) return;

    const syncPayload: HistorySyncPayload = {
      messages: room.messages,
      files: room.sharedFiles.map(f => ({
        id: f.id,
        name: f.name,
        size: f.size,
        mimeType: f.mimeType,
        senderId: f.senderId,
        timestamp: f.timestamp
      })),
      participants: Array.from(room.participants.values())
    };

    this.logger.historySyncReceived('HOST', syncPayload.messages.length, syncPayload.files.length);
    const msg = this.createPeerMessage('history-sync', syncPayload, this.authService.currentUser()?.id || '');
    this.peerService.sendMessage(peerId, msg).catch(err => console.error('Failed to send history sync:', err));
  }

  private handleHistorySync(payload: HistorySyncPayload): void {
    this.logger.historySyncReceived('HOST', payload.messages?.length || 0, payload.files?.length || 0);
    this.messages.set(payload.messages);
    this.participants.set(payload.participants);
    this.logger.participantUpdate(payload.participants);

    const room = this.currentRoom();
    if (room) {
      payload.participants.forEach(p => {
        if (!room.participants.has(p.id)) {
          room.participants.set(p.id, p);
        }
      });
      this.refreshCurrentRoom();
    }
  }

  private addToBanList(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;
    room.banList.add(userId);
    this.banList.set(Array.from(room.banList));
    this.logger.banAdded('HOST (via sync)', userId, Array.from(room.banList));
  }

  private removeFromBanList(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;
    room.banList.delete(userId);
    const updatedList = Array.from(room.banList);
    this.banList.set(updatedList);
    this.logger.banRemoved('HOST (via sync)', userId, updatedList);
  }

  private updateParticipantsFromRoom(room: Room): void {
    this.participants.set(Array.from(room.participants.values()));
  }

  private updatePendingRequests(room: Room): void {
    this.pendingRequests.set(Array.from(room.pendingRequests.values()));
  }
}