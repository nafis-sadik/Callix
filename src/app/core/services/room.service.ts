import { Injectable, signal } from '@angular/core';
import { PeerService } from './peer.service';
import { EncryptionService } from './encryption.service';
import { AuthService } from './auth.service';
import { User, Room, RoomType, EncryptionAlgorithm, JoinRequest, Message, SharedFile, HistorySyncPayload } from '../models/room.model';
import { PeerMessage, PeerMessageType } from '../models/peer-message.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RoomService {
  currentRoom = signal<Room | null>(null);
  participants = signal<User[]>([]);
  messages = signal<Message[]>([]);
  sharedFiles = signal<SharedFile[]>([]);
  pendingRequests = signal<JoinRequest[]>([]);
  banList = signal<string[]>([]);
  isHost = signal<boolean>(false);

  private peerService: PeerService;
  private encryptionService: EncryptionService;
  private authService: AuthService;

  constructor(
    peerService: PeerService,
    encryptionService: EncryptionService,
    authService: AuthService
  ) {
    this.peerService = peerService;
    this.encryptionService = encryptionService;
    this.authService = authService;
    
    this.setupMessageListeners();
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

  private setupMessageListeners(): void {
    this.peerService.onMessage$.subscribe((message) => {
      if (!message) return;
      this.handlePeerMessage(message);
    });
  }

  private handlePeerMessage(message: PeerMessage): void {
    switch (message.type) {
      case 'chat':
        this.addMessage(message.payload);
        break;
      case 'join-request':
        this.handleJoinRequest(message);
        break;
      case 'join-response':
        this.handleJoinResponse(message);
        break;
      case 'participant-update':
        this.updateParticipantsFromRoom(message.payload);
        break;
      case 'kick':
        this.handleKicked(message);
        break;
      case 'ban':
        this.addToBanList(message.payload);
        break;
      case 'unban':
        this.removeFromBanList(message.payload);
        break;
      case 'room-destroyed':
        this.handleRoomDestroyed();
        break;
      case 'file-meta':
        this.handleFileMeta(message);
        break;
      case 'file-chunk':
        this.handleFileChunk(message);
        break;
      case 'file-complete':
        this.handleFileComplete(message);
        break;
      case 'history-sync':
        this.handleHistorySync(message.payload);
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

    room.participants.set(user.id, {
      id: user.id,
      displayName: user.displayName,
      peerId: this.peerService.peerId || user.peerId,
      isHost: true
    });

    this.currentRoom.set(room);
    this.isHost.set(true);
    this.updateParticipantsFromRoom(room);

    return room;
  }

  async joinRoom(roomId: string): Promise<void> {
    try {
      await this.peerService.connectToPeer(roomId);
      
      const user = this.authService.currentUser();
      if (!user) throw new Error('User not authenticated');

      const joinRequest = this.createPeerMessage('join-request', {
          userId: user.id,
          displayName: user.displayName,
          peerId: this.peerService.peerId || ''
        }, user.id);

      await this.peerService.sendMessage(roomId, joinRequest);
    } catch (err) {
      console.error('Failed to join room:', err);
      throw err;
    }
  }

  approveRequest(userId: string): void {
    const room = this.currentRoom();
    if (!room || !this.isHost()) return;

    const request = room.pendingRequests.get(userId);
    if (!request) return;

    room.pendingRequests.delete(userId);
    room.participants.set(userId, {
      id: request.userId,
      displayName: request.displayName,
      peerId: request.peerId
    });

    this.updateParticipantsFromRoom(room);
    this.currentRoom.set(room);
    this.updatePendingRequests(room);

    const user = this.authService.currentUser();
    const response = this.createPeerMessage('join-response', { approved: true, roomId: room.id }, user?.id || '');

    this.peerService.sendMessage(request.peerId, response);
    this.sendHistorySync(request.peerId);
  }

  denyRequest(userId: string): void {
    const room = this.currentRoom();
    if (!room || !this.isHost()) return;

    const request = room.pendingRequests.get(userId);
    if (!request) return;

    room.pendingRequests.delete(userId);
    this.updatePendingRequests(room);
    this.currentRoom.set(room);

    const user = this.authService.currentUser();
    const response = this.createPeerMessage('join-response', { approved: false }, user?.id || '');

    this.peerService.sendMessage(request.peerId, response);
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

    const user = this.authService.currentUser();
      const kickMsg = this.createPeerMessage('kick', { userId }, user?.id || '');

    this.peerService.sendMessage(participant.peerId, kickMsg);
    this.banUser(userId);
    
    room.participants.delete(userId);
    this.updateParticipantsFromRoom(room);
    this.currentRoom.set(room);
  }

  banUser(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;

    room.banList.add(userId);
    this.banList.set(Array.from(room.banList));
    this.currentRoom.set(room);
  }

  unbanUser(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;

    room.banList.delete(userId);
    this.banList.set(Array.from(room.banList));
    this.currentRoom.set(room);
  }

  unbanAll(): void {
    const room = this.currentRoom();
    if (!room) return;

    room.banList.clear();
    this.banList.set([]);
    this.currentRoom.set(room);
  }

  leaveRoom(): void {
    const room = this.currentRoom();
    if (!room) return;

    if (this.isHost()) {
      const user = this.authService.currentUser();
      const destroyMsg = this.createPeerMessage('room-destroyed', { roomId: room.id }, user?.id || '');

      this.peerService.broadcastMessage(destroyMsg);
      this.peerService.destroy();
    } else {
      const host = Array.from(room.participants.values()).find(p => p.isHost);
      if (host) {
        this.peerService.disconnectFromPeer(host.peerId);
      }
    }

    this.currentRoom.set(null);
    this.participants.set([]);
    this.messages.set([]);
    this.sharedFiles.set([]);
    this.pendingRequests.set([]);
    this.banList.set([]);
    this.isHost.set(false);
    this.encryptionService.clearKeys();
  }

  addMessage(content: string, type: 'text' | 'file' | 'system' = 'text'): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const message: Message = {
      id: uuidv4(),
      senderId: user.id,
      senderName: user.displayName,
      content,
      timestamp: Date.now(),
      type
    };

    const room = this.currentRoom();
    if (room) {
      room.messages.push(message);
      this.messages.set([...room.messages]);
      this.currentRoom.set(room);
    }

    if (type !== 'system') {
      const msg = this.createPeerMessage('chat', message, user.id);

      this.peerService.broadcastMessage(msg);
    }
  }

  private handleJoinRequest(message: PeerMessage): void {
    if (!this.isHost()) return;

    const room = this.currentRoom();
    if (!room) return;

    const payload = message.payload;
    
    if (room.banList.has(payload.userId)) {
      const user = this.authService.currentUser();
      const response = this.createPeerMessage('join-response', { approved: false, reason: 'banned' }, user?.id || '');
      this.peerService.sendMessage(payload.peerId, response);
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
    this.currentRoom.set(room);
  }

  private handleJoinResponse(message: PeerMessage): void {
    const payload = message.payload;
    if (payload.approved) {
      this.addMessage('You have joined the room', 'system');
    } else {
      console.log('Join request denied');
    }
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

    const msg = this.createPeerMessage('history-sync', syncPayload, this.authService.currentUser()?.id || '');

    this.peerService.sendMessage(peerId, msg);
  }

  private handleHistorySync(payload: HistorySyncPayload): void {
    this.messages.set(payload.messages);
    this.participants.set(payload.participants);
  }

  private handleKicked(message: PeerMessage): void {
    alert('You have been kicked from the meeting');
    this.leaveRoom();
  }

  private handleRoomDestroyed(): void {
    alert('The meeting room has been closed by the host');
    this.leaveRoom();
  }

  private addToBanList(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;
    room.banList.add(userId);
    this.banList.set(Array.from(room.banList));
  }

  private removeFromBanList(userId: string): void {
    const room = this.currentRoom();
    if (!room) return;
    room.banList.delete(userId);
    this.banList.set(Array.from(room.banList));
  }

  private handleFileMeta(message: PeerMessage): void {
    // Handle file metadata
  }

  private handleFileChunk(message: PeerMessage): void {
    // Handle file chunk
  }

  private handleFileComplete(message: PeerMessage): void {
    // Handle file complete
  }

  private updateParticipantsFromRoom(room: Room): void {
    this.participants.set(Array.from(room.participants.values()));
  }

  private updatePendingRequests(room: Room): void {
    this.pendingRequests.set(Array.from(room.pendingRequests.values()));
  }
}
