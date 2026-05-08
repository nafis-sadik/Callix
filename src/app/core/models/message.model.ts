export type MessageType = 'text' | 'file' | 'system';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: MessageType;
}
