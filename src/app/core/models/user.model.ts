export interface User {
  id: string;          // GUID
  displayName: string;
  peerId: string;      // PeerJS peer ID
  avatar?: string;
  isHost?: boolean;
}