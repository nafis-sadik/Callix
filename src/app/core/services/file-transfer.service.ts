import { Injectable, signal } from '@angular/core';
import { PeerService } from './peer.service';
import { PeerMessage } from '../models/peer-message.model';
import { SharedFile } from '../models/room.model';

interface PendingFileReception {
  fileId: string;
  name: string;
  size: number;
  mimeType: string;
  chunks: number;
  receivedChunks: number;
  data: Uint8Array[];
  senderId: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class FileTransferService {
  readonly CHUNK_SIZE = 16384;
  readonly LARGE_FILE_THRESHOLD = 52428800;

  transferProgress = signal<{ [fileId: string]: number }>({});
  receivedFiles = signal<SharedFile[]>([]);
  onFileReceived = signal<SharedFile | null>(null);

  private pendingReceptions = new Map<string, PendingFileReception>();

  constructor(private peerService: PeerService) {}

  async sendFile(file: File, peerIds: string[], senderId: string): Promise<void> {
    const fileId = crypto.randomUUID();
    const chunks = Math.ceil(file.size / this.CHUNK_SIZE);

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
      senderId,
      encrypted: false
    };

    for (const peerId of peerIds) {
      await this.peerService.sendMessage(peerId, metaMsg);
    }

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
        senderId,
        encrypted: false
      };

      for (const peerId of peerIds) {
        await this.peerService.sendMessage(peerId, chunkMsg);
      }

      offset += this.CHUNK_SIZE;
      chunkIndex++;

      const progress = (offset / buffer.byteLength) * 100;
      this.updateProgress(fileId, progress);
    }

    const completeMsg: PeerMessage = {
      type: 'file-complete',
      payload: { fileId },
      timestamp: Date.now(),
      senderId,
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
    const { fileId, name, size, mimeType, chunks, senderId, timestamp } = payload;
    this.pendingReceptions.set(fileId, {
      fileId,
      name,
      size,
      mimeType,
      chunks,
      receivedChunks: 0,
      data: [],
      senderId: senderId || '',
      timestamp: timestamp || Date.now()
    });
    this.updateProgress(fileId, 0);
  }

  handleFileChunk(payload: any): void {
    const { fileId, chunkIndex, data } = payload;
    const pending = this.pendingReceptions.get(fileId);
    if (!pending) return;

    pending.data[chunkIndex] = new Uint8Array(data);
    pending.receivedChunks++;

    const progress = (pending.receivedChunks / pending.chunks) * 100;
    this.updateProgress(fileId, progress);
  }

  handleFileComplete(payload: any): void {
    const { fileId } = payload;
    const pending = this.pendingReceptions.get(fileId);
    if (!pending) return;

    if (pending.receivedChunks < pending.chunks) {
      console.error(`File ${fileId}: missing ${pending.chunks - pending.receivedChunks} chunks, discarding`);
      this.pendingReceptions.delete(fileId);
      this.updateProgress(fileId, -1);
      return;
    }

    const totalLength = pending.data.reduce((sum, part) => sum + part.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (let i = 0; i < pending.data.length; i++) {
      combined.set(pending.data[i], offset);
      offset += pending.data[i].length;
    }

    const sharedFile: SharedFile = {
      id: fileId,
      name: pending.name,
      size: pending.size,
      mimeType: pending.mimeType,
      senderId: pending.senderId,
      data: combined.buffer,
      timestamp: pending.timestamp
    };

    const current = this.receivedFiles();
    current.push(sharedFile);
    this.receivedFiles.set([...current]);

    this.onFileReceived.set(sharedFile);
    this.pendingReceptions.delete(fileId);
    this.updateProgress(fileId, 100);
  }

  getFileById(fileId: string): SharedFile | undefined {
    return this.receivedFiles().find(f => f.id === fileId);
  }
}
