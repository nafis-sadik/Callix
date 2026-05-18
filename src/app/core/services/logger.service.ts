import { Injectable, isDevMode } from '@angular/core';

export type LogCategory = 
  | 'connection' 
  | 'disconnection' 
  | 'message' 
  | 'ban' 
  | 'kick' 
  | 'host' 
  | 'guest' 
  | 'join' 
  | 'leave'
  | 'media'
  | 'error'
  | 'info';

interface ConsoleStyles {
  reset: string;
  connection: string;
  disconnection: string;
  message: string;
  ban: string;
  kick: string;
  host: string;
  guest: string;
  join: string;
  leave: string;
  media: string;
  error: string;
  info: string;
  timestamp: string;
  label: string;
  value: string;
  arrow: string;
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private shouldLog: boolean;

  private styles: ConsoleStyles = {
    reset: 'color: inherit; background: inherit; font-weight: normal;',
    connection: 'color: #22c55e; background: #1a2e1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    disconnection: 'color: #ef4444; background: #2e1a1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    message: 'color: #3b82f6; background: #1a1a2e; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    ban: 'color: #f97316; background: #2e1f1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    kick: 'color: #dc2626; background: #2e1a1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    host: 'color: #eab308; background: #2e2a1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    guest: 'color: #06b6d4; background: #1a2a2e; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    join: 'color: #84cc16; background: #1f2e1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    leave: 'color: #f43f5e; background: #2e1a1f; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    media: 'color: #a855f7; background: #251a2e; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    error: 'color: #ef4444; background: #2e1a1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    info: 'color: #6b7280; background: #1a1a1a; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    timestamp: 'color: #6b7280; font-size: 0.9em;',
    label: 'font-weight: bold; color: #9ca3af;',
    value: 'color: #f3f4f6;',
    arrow: 'color: #6b7280;',
  };

  constructor() {
    this.shouldLog = this.checkShouldLog();
  }

  private checkShouldLog(): boolean {
    const isDev = isDevMode();
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' ||
       window.location.hostname === '');
    
    const shouldLog = isDev || !isLocalhost;
    
    if (shouldLog) {
      console.log(
        `%c[LOGGER]%c Detailed logging enabled`,
        'color: #22c55e; background: #1a2e1a; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        'color: #9ca3af;'
      );
    }
    
    return shouldLog;
  }

  private getTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3 as any
    });
  }

  private formatCategory(category: LogCategory): string {
    return category.toUpperCase().padEnd(13, ' ');
  }

  log(
    category: LogCategory,
    title: string,
    data?: Record<string, any> | null,
    options?: { group?: boolean; collapsed?: boolean }
  ): void {
    if (!this.shouldLog) return;

    const timestamp = this.getTimestamp();
    const useGroup = options?.group && data && Object.keys(data).length > 0;
    const collapsed = options?.collapsed ?? true;

    if (useGroup) {
      if (collapsed) {
        console.groupCollapsed(
          `%c${this.formatCategory(category)}%c ${title} %c@ ${timestamp}`,
          this.styles[category],
          this.styles.reset,
          this.styles.timestamp
        );
      } else {
        console.group(
          `%c${this.formatCategory(category)}%c ${title} %c@ ${timestamp}`,
          this.styles[category],
          this.styles.reset,
          this.styles.timestamp
        );
      }
      
      if (data) {
        this.logData(data);
      }
      console.groupEnd();
    } else {
      if (data && Object.keys(data).length > 0) {
        console.log(
          `%c${this.formatCategory(category)}%c ${title} %c@ ${timestamp}`,
          this.styles[category],
          this.styles.reset,
          this.styles.timestamp,
          data
        );
      } else {
        console.log(
          `%c${this.formatCategory(category)}%c ${title} %c@ ${timestamp}`,
          this.styles[category],
          this.styles.reset,
          this.styles.timestamp
        );
      }
    }
  }

  private logData(data: Record<string, any>): void {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        console.log(`  %c${key}:`, this.styles.label);
        console.log(value);
      } else {
        console.log(
          `  %c${key}:%c ${value}`,
          this.styles.label,
          this.styles.value
        );
      }
    });
  }

  connection(who: string, connectingTo: string, details?: Record<string, any>): void {
    this.log('connection', `${who} → connecting to ${connectingTo}`, details, { group: true });
  }

  connectionAccepted(who: string, from: string, details?: Record<string, any>): void {
    this.log('connection', `${who} ← accepted connection from ${from}`, details, { group: true });
  }

  disconnection(who: string, from: string, details?: Record<string, any>): void {
    this.log('disconnection', `${who} × disconnected from ${from}`, details, { group: true });
  }

  messageSent(to: string, type: string, payload?: any): void {
    const data: Record<string, any> = { to: to, type: type };
    if (payload !== undefined) {
      data['payload'] = this.sanitizePayload(payload);
    }
    this.log('message', `→ SENT to "${to}"`, data, { group: true, collapsed: true });
  }

  messageReceived(from: string, type: string, payload?: any): void {
    const data: Record<string, any> = { from: from, type: type };
    if (payload !== undefined) {
      data['payload'] = this.sanitizePayload(payload);
    }
    this.log('message', `← RECEIVED from "${from}"`, data, { group: true, collapsed: true });
  }

  private sanitizePayload(payload: any): any {
    if (typeof payload === 'object' && payload !== null) {
      const sanitized = { ...payload };
      if (sanitized.publicKey) {
        sanitized.publicKey = '[Crypto Key (hidden)]';
      }
      if (sanitized.chunkData) {
        sanitized.chunkData = `[Binary Data: ${sanitized.chunkData?.length || 0} bytes]`;
      }
      return sanitized;
    }
    return payload;
  }

  banAdded(byWho: string, userId: string, banList: string[]): void {
    this.log('ban', `${byWho} BANNED user: ${userId}`, { 
      bannedUserId: userId, 
      updatedBanList: banList,
      banCount: banList.length
    }, { group: true });
  }

  banRemoved(byWho: string, userId: string, banList: string[]): void {
    this.log('ban', `${byWho} UNBANNED user: ${userId}`, { 
      unbannedUserId: userId, 
      updatedBanList: banList,
      banCount: banList.length
    }, { group: true });
  }

  banListSynced(receivedFrom: string, banList: string[]): void {
    this.log('ban', `Ban list SYNCED from ${receivedFrom}`, { 
      banList: banList,
      count: banList.length
    }, { group: true });
  }

  bannedUserBlocked(userId: string, peerId: string): void {
    this.log('ban', `BLOCKED join attempt from banned user`, { 
      userId: userId,
      peerId: peerId
    }, { group: true });
  }

  kickInitiated(byWho: string, userId: string): void {
    this.log('kick', `${byWho} KICKING user: ${userId}`, { 
      targetUserId: userId,
      status: 'pending'
    }, { group: true });
  }

  kickReceived(fromWho: string): void {
    this.log('kick', `RECEIVED kick command from ${fromWho}`, { 
      status: 'processing'
    }, { group: true });
  }

  kickCompleted(kickedUserId: string, wasAddedToBan: boolean): void {
    this.log('kick', `KICK COMPLETED for: ${kickedUserId}`, { 
      kickedUserId: kickedUserId,
      addedToBanList: wasAddedToBan
    }, { group: true });
  }

  hostCreatedRoom(roomId: string, roomName: string): void {
    this.log('host', `HOST created room: "${roomName}"`, { 
      roomId: roomId,
      roomName: roomName,
      role: 'HOST'
    }, { group: true });
  }

  hostApprovedJoin(userId: string, displayName: string): void {
    this.log('host', `HOST APPROVED join request`, { 
      userId: userId,
      displayName: displayName
    }, { group: true });
  }

  hostDeniedJoin(userId: string, displayName: string, reason?: string): void {
    const data: Record<string, any> = { userId: userId, displayName: displayName };
    if (reason) data['reason'] = reason;
    this.log('host', `HOST DENIED join request`, data, { group: true });
  }

  hostDestroyedRoom(roomId: string, participantCount: number): void {
    this.log('host', `HOST DESTROYED room`, { 
      roomId: roomId,
      participantsNotified: participantCount
    }, { group: true });
  }

  guestJoinedAsGuest(roomId: string, roomName: string, hostId: string): void {
    this.log('guest', `JOINED as GUEST`, { 
      roomId: roomId,
      roomName: roomName,
      hostId: hostId,
      role: 'GUEST'
    }, { group: true });
  }

  guestJoinRequestSent(roomId: string): void {
    this.log('join', `SENT join request to room`, { 
      roomId: roomId
    }, { group: true });
  }

  guestJoinApproved(roomId: string, roomName: string): void {
    this.log('join', `Join request APPROVED`, { 
      roomId: roomId,
      roomName: roomName
    }, { group: true });
  }

  guestJoinDenied(roomId: string, reason?: string): void {
    const data: Record<string, any> = { roomId: roomId };
    if (reason) data['reason'] = reason;
    this.log('join', `Join request DENIED`, data, { group: true });
  }

  incomingJoinRequest(userId: string, displayName: string, peerId: string): void {
    this.log('join', `INCOMING join request`, { 
      userId: userId,
      displayName: displayName,
      peerId: peerId
    }, { group: true });
  }

  userLeftRoom(userId: string, displayName: string, role: string): void {
    this.log('leave', `${role} LEFT room`, { 
      userId: userId,
      displayName: displayName,
      role: role
    }, { group: true });
  }

  roomDestroyedByHost(): void {
    this.log('leave', `Room DESTROYED by host`, { 
      action: 'must leave'
    }, { group: true });
  }

  mediaCallInitiated(toPeerId: string): void {
    this.log('media', `→ CALLING peer: ${toPeerId}`, { 
      peerId: toPeerId
    }, { group: true });
  }

  mediaCallReceived(fromPeerId: string): void {
    this.log('media', `← INCOMING call from: ${fromPeerId}`, { 
      peerId: fromPeerId
    }, { group: true });
  }

  mediaCallAnswered(peerId: string): void {
    this.log('media', `✓ ANSWERED call from: ${peerId}`, { 
      peerId: peerId
    }, { group: true });
  }

  remoteStreamReceived(peerId: string): void {
    this.log('media', `↔ REMOTE STREAM from: ${peerId}`, { 
      peerId: peerId,
      status: 'active'
    }, { group: true });
  }

  mediaCallClosed(peerId: string): void {
    this.log('media', `× CALL CLOSED with: ${peerId}`, { 
      peerId: peerId
    }, { group: true });
  }

  participantUpdate(participants: any[]): void {
    this.log('info', `PARTICIPANTS updated`, { 
      count: participants.length,
      participants: participants.map(p => ({ id: p.id, name: p.displayName, isHost: p.isHost }))
    }, { group: true, collapsed: true });
  }

  historySyncReceived(from: string, messageCount: number, fileCount: number): void {
    this.log('info', `HISTORY SYNC from ${from}`, { 
      messages: messageCount,
      files: fileCount
    }, { group: true });
  }

  keyExchangeInitiated(withPeerId: string): void {
    this.log('info', `KEY EXCHANGE initiated with: ${withPeerId}`, { 
      peerId: withPeerId,
      status: 'pending'
    }, { group: true });
  }

  keyExchangeComplete(withPeerId: string): void {
    this.log('info', `KEY EXCHANGE complete with: ${withPeerId}`, { 
      peerId: withPeerId,
      status: 'ready'
    }, { group: true });
  }

  peerInitialized(peerId: string): void {
    this.log('connection', `PEER initialized with ID: ${peerId}`, { 
      peerId: peerId,
      status: 'ready'
    }, { group: true });
  }

  peerDestroyed(): void {
    this.log('disconnection', `PEER destroyed`, { 
      status: 'all connections closed'
    }, { group: true });
  }

  connectedPeersList(peerIds: string[]): void {
    this.log('info', `Connected peers: [${peerIds.length}]`, { 
      peers: peerIds,
      count: peerIds.length
    }, { group: true, collapsed: true });
  }
}
