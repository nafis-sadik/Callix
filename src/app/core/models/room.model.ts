export type RoomType = 'meeting' | 'chat';
export type EncryptionAlgorithm = 'AES-GCM-256' | 'AES-CBC-256' | 'ChaCha20-Poly1305';

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  hostId: string;
  encryptionAlgorithm: EncryptionAlgorithm;
  participants: Map<string, User>;
  banList: Set<string>;
  pendingRequests: Map<string, JoinRequest>;
  messages: Message[];
  sharedFiles: SharedFile[];
  mediaPlayback?: MediaPlayback;
  createdAt: number;
}

export interface User {
  id: string;
  displayName: string;
  peerId: string;
  avatar?: string;
  isHost?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: 'text' | 'file' | 'system';
}

export interface JoinRequest {
  userId: string;
  displayName: string;
  peerId: string;
  timestamp: number;
}

export interface SharedFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  senderId: string;
  data?: ArrayBuffer;
  timestamp: number;
}

export interface SharedFileMetadata {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  senderId: string;
  timestamp: number;
}

export interface MediaPlayback {
  url: string;
  currentTime: number;
  isPlaying: boolean;
  startedBy: string;
  startedAt: number;
}

export interface HistorySyncPayload {
  messages: Message[];
  files: SharedFileMetadata[];
  participants: User[];
}
