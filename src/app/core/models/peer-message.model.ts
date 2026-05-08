export type PeerMessageType =
  | 'chat' | 'file-meta' | 'file-chunk' | 'file-complete'
  | 'join-request' | 'join-response'
  | 'kick' | 'ban' | 'unban'
  | 'room-destroyed' | 'participant-update'
  | 'media-sync' | 'screen-share-start' | 'screen-share-stop'
  | 'active-speaker' | 'system' | 'history-sync' | 'file-request'
  | 'key-exchange' | 'key-exchange-response';

export interface PeerMessage {
  type: PeerMessageType;
  payload: any;
  timestamp: number;
  senderId: string;
  encrypted: boolean;
}
