import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  isRecording = signal<boolean>(false);

  startRecording(stream: MediaStream): void {
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(1000);
    this.isRecording.set(true);
  }

  stopRecording(): Promise<Blob | null> {
    if (!this.mediaRecorder) return Promise.resolve(null);

    return new Promise((resolve) => {
      const recorder = this.mediaRecorder!;
      recorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.recordedChunks = [];
        resolve(blob);
      };
      recorder.stop();
      this.mediaRecorder = null;
      this.isRecording.set(false);
    });
  }

  downloadRecording(blob: Blob, filename: string = 'recording.webm'): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
