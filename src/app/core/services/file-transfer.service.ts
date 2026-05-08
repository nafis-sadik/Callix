import { Injectable, signal } from '@angular/core';
import { PeerService } from './peer.service';
import { PeerMessage } from '../models/peer-message.model';
import { SharedFile } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class FileTransferService {
  readonly CHUNK_SIZE = 16384; // 16KB
  readonly LARGE_FILE_THRESHOLD = 52428800; // 50MB

  transferProgress = signal<{ [fileId: string]: number }>({});
  receivedFiles = signal<SharedFile[]>([]);
  onFileReceived$ = signal<SharedFile | null>(null);

  constructor(private peerService: PeerService) {}

  async sendFile(file: File, peerIds: string[]): Promise<void> {
    const fileId = crypto.randomUUID();
    const chunks = Math.ceil(file.size / this.CHUNK_SIZE);
    
    // Send file metadata
    const metaMsg: PeerMessage = {
      type: 'file-meta',
      payload: {
        fileId,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        chunks
      },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };

    for (const peerId of peerIds) {
      await this.peerService.sendMessage(peerId, metaMsg);
    }

    // Send file in chunks
    const buffer = await file.arrayBuffer();
    let offset = 0;
    let chunkIndex = 0;

    while (offset < buffer.byteLength) {
      const chunk = buffer.slice(offset, offset + this.CHUNK_SIZE);
      const chunkMsg: PeerMessage = {
        type: 'file-chunk',
        payload: {
          fileId,
          chunkIndex,
          data: Array.from(new Uint8Array(chunk))
        },
        timestamp: Date.now(),
        senderId: '',
        encrypted: false
      };

      for (const peerId of peerIds) {
        await this.peerService.sendMessage(peerId, chunkMsg);
      }

      offset += this.CHUNK_SIZE;
      chunkIndex++;
      
      // Update progress
      const progress = (offset / buffer.byteLength) * 100;
      this.updateProgress(fileId, progress);
    }

    // Send file complete
    const completeMsg: PeerMessage = {
      type: 'file-complete',
      payload: { fileId },
      timestamp: Date.now(),
      senderId: '',
      encrypted: false
    };

    for (const peerId of peerIds) {
      await this.peerService.sendMessage(peerId, completeMsg);
    }

    this.updateProgress(fileId, 100);
  }

  private updateProgress(fileId: string, progress: number): void {
    const current = this.transferProgress();
    current[fileId] = progress;
    this.transferProgress.set({ ...current });
  }

  handleFileMeta(payload: any): void {
    // Initialize file reception
  }

  handleFileChunk(payload: any): void {
    // Assemble file chunks
  }

  handleFileComplete(payload: any): void {
    // Finalize file
  }
}
