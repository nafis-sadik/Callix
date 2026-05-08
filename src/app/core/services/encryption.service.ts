import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  private roomKey: CryptoKey | null = null;
  private ecdhKeyPair: CryptoKeyPair | null = null;

  async generateKeyPair(): Promise<CryptoKeyPair> {
    this.ecdhKeyPair = await crypto.subtle.generateKey(
      { name: 'ECDH', namedCurve: 'P-256' },
      false,
      ['deriveKey', 'deriveBits']
    );
    return this.ecdhKeyPair;
  }

  async deriveSharedSecret(publicKey: CryptoKey): Promise<ArrayBuffer> {
    if (!this.ecdhKeyPair) throw new Error('ECDH key pair not generated');
    return await crypto.subtle.deriveBits(
      { name: 'ECDH', public: publicKey },
      this.ecdhKeyPair.privateKey,
      256
    );
  }

  async generateRoomKey(algorithm: string): Promise<CryptoKey> {
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    this.roomKey = key;
    return key;
  }

  async encrypt(data: string, key?: CryptoKey): Promise<string> {
    const encKey = key || this.roomKey;
    if (!encKey) throw new Error('No encryption key available');
    
    const encoder = new TextEncoder();
    const encoded = encoder.encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      encKey,
      encoded
    );
    
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    return btoa(String.fromCharCode(...combined));
  }

  async decrypt(encryptedData: string, key?: CryptoKey): Promise<string> {
    const decKey = key || this.roomKey;
    if (!decKey) throw new Error('No decryption key available');
    
    const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      decKey,
      data
    );
    
    return new TextDecoder().decode(decrypted);
  }

  async exportKey(key?: CryptoKey): Promise<string> {
    const k = key || this.roomKey;
    if (!k) throw new Error('No key to export');
    const exported = await crypto.subtle.exportKey('raw', k);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  async importKey(keyData: string, algorithm: string = 'AES-GCM'): Promise<CryptoKey> {
    const raw = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
    this.roomKey = await crypto.subtle.importKey(
      'raw',
      raw,
      { name: algorithm, length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    return this.roomKey;
  }

  async exportPublicKey(): Promise<string> {
    if (!this.ecdhKeyPair) throw new Error('No ECDH key pair');
    const exported = await crypto.subtle.exportKey('raw', this.ecdhKeyPair.publicKey);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  async importPublicKey(keyData: string): Promise<CryptoKey> {
    const raw = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
      'raw',
      raw,
      { name: 'ECDH', namedCurve: 'P-256' },
      false,
      []
    );
  }

  setRoomKey(key: CryptoKey): void {
    this.roomKey = key;
  }

  getRoomKey(): CryptoKey | null {
    return this.roomKey;
  }

  clearKeys(): void {
    this.roomKey = null;
    this.ecdhKeyPair = null;
  }
}
