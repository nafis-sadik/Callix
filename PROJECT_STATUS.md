# Callix Project Status Report
> **Date:** 2026-05-08  
> **Status:** Core infrastructure complete, UI partially functional, P2P features in progress  
> **Next AI:** Pick up from here and complete remaining features

---

## Project Overview
Callix is a P2P (peer-to-peer) meeting and chat application built with Angular 21. It uses WebRTC (via PeerJS) for direct browser-to-browser communication with no backend server.

**Key Technologies:**
- Angular 21 (Standalone components, signals, new control flow `@if/@for`)
- TailwindCSS 3.x (with custom design tokens)
- PeerJS (WebRTC signaling)
- Web Crypto API (E2E encryption)
- SweetAlert2 (alerts)
- angularx-qrcode (QR code generation)
- @angular/pwa (PWA support)

---

## ✅ What's Completed

### 1. Project Infrastructure
- [x] Angular 21 project scaffolded with standalone components
- [x] TypeScript configuration updated for standalone components
- [x] TailwindCSS 3.x configured with custom theme tokens
- [x] PostCSS configuration for Tailwind
- [x] @angular/pwa added (service worker, manifest)
- [x] Package.json with all required dependencies

### 2. Design System
- [x] CSS custom properties (variables) for all colors
- [x] Glassmorphism utility class (`.glass-card`)
- [x] Dark/light/system theme support via ThemeService
- [x] Centralized color tokens matching the design spec:
  - Primary: `#4F6AF0`
  - Accent: `#6EC6CA`
  - Surface colors for light/dark modes
  - Text primary/secondary colors
  - Success/Warning/Danger colors

### 3. Data Models (All Complete)
- [x] `user.model.ts` - User interface
- [x] `room.model.ts` - Room, RoomType, EncryptionAlgorithm
- [x] `message.model.ts` - Message interface
- [x] `peer-message.model.ts` - PeerMessage, PeerMessageType
- [x] `join-request.model.ts`
- [x] `shared-file.model.ts`
- [x] `media-playback.model.ts`

### 4. Core Services (All Created)
- [x] **AuthService** - localStorage-based auth, user GUID generation
- [x] **PeerService** - PeerJS wrapper for P2P connections
  - Data connections management
  - Media connections (calls) management
  - Remote streams tracking
  - Message sending with encryption support
  - Broadcast messaging
- [x] **RoomService** - Room state management
  - Create/join rooms
  - Participant management
  - Join request handling (approve/deny)
  - Ban/unban functionality
  - Message history
  - Pending requests tracking
- [x] **EncryptionService** - Web Crypto API wrapper
  - ECDH key pair generation
  - Shared secret derivation
  - AES-GCM encryption/decryption
  - Key export/import
- [x] **FileTransferService** - P2P file sharing (chunking)
  - 16KB chunk size
  - 50MB large file warning
- [x] **MediaSyncService** - Synchronized media playback
- [x] **RecordingService** - MediaRecorder API wrapper
- [x] **ThemeService** - Light/dark/system theme
  - Preference persistence in localStorage
  - System theme detection
- [x] **AlertService** - SweetAlert2 wrapper

### 5. UI Components (Basic Structure)
- [x] **Login Component**
  - Display name input
  - Google sign-in placeholder (generates GUID)
  - AuthService integration

- [x] **Home Component**
  - Navbar with logo, user name, theme toggle, logout
  - "Start Meeting" CTA
  - "Join a Room" section (GUID input)
  - "My Chat Rooms" section (placeholder cards)
  - Create chat room button

- [x] **Meeting Room Component**
  - Big screen area (video display)
  - Participant carousel (basic)
  - Controls toolbar (mic, camera, screen share, record, chat toggle)
  - Chat sidebar (basic structure)
  - Join requests panel (host only)
  - Ban list panel (host only)
  - Room info modal (GUID display)
  - Media player controls (host only)

- [x] **Shared Components:**
  - [x] NavbarComponent
  - [x] ThemeToggleComponent
  - [x] QrCodeModalComponent (uses angularx-qrcode)
  - [x] FileUploadComponent
  - [x] Pipes: FileSizePipe, TimeAgoPipe

---

## ⚠️ What's NOT Completed (Remaining Work)

### High Priority

#### 1. ECDH Key Exchange Integration
**Status:** Code written but removed due to build errors  
**Location:** `peer.service.ts`  
**What needs to be done:**
- [ ] Add `initiateECDHExchange()` method to PeerService
- [ ] Add `handleKeyExchange()` method
- [ ] Integrate ECDH with PeerJS data connections
- [ ] When a peer connects, exchange public keys
- [ ] Derive shared secret and set up room key encryption
- [ ] Test E2E encrypted messaging

**Implementation notes:**
```typescript
// In PeerService, when connection opens:
async initiateECDHExchange(peerId: string, conn: any): Promise<void> {
  // 1. Generate ECDH key pair
  const keyPair = await this.encryptionService.generateKeyPair();
  
  // 2. Send public key to peer
  const publicKey = await this.encryptionService.exportPublicKey();
  conn.send(JSON.stringify({
    type: 'key-exchange',
    payload: { publicKey }
  }));
  
  // 3. Listen for peer's public key
  conn.on('data', (data) => {
    const msg = JSON.parse(data);
    if (msg.type === 'key-exchange') {
      this.handleKeyExchange(msg.payload.publicKey, peerId);
    }
  });
}

private async handleKeyExchange(peerPublicKey: string, peerId: string): void {
  // Import peer's public key
  const importedKey = await this.encryptionService.importPublicKey(peerPublicKey);
  
  // Derive shared secret
  const sharedSecret = await this.encryptionService.deriveSharedSecret(importedKey);
  
  // Use shared secret to encrypt/decrypt room key
  // (Implementation depends on room key exchange protocol)
}
```

#### 2. Video Stream Display
**Status:** Local stream works, remote streams tracked but not fully displayed  
**Location:** `meeting-room.component.ts`, `meeting-room.html`  
**What needs to be done:**
- [ ] Properly display remote video streams from other peers
- [ ] Implement "big screen" logic:
  - Priority: Screen share > Synced media > Pinned user > Active speaker
- [ ] Add video grid for multiple participants
- [ ] Implement active speaker detection (using AudioContext/AnalyserNode)
- [ ] Auto-switch to active speaker
- [ ] Pin participant feature

#### 3. Owl Carousel for Participants
**Status:** Basic div-based carousel in place  
**Location:** `participant-carousel` component (needs creation)  
**What needs to be done:**
- [ ] Install `ngx-owl-carousel-o`
- [ ] Create `ParticipantCarouselComponent`
- [ ] Integrate Owl Carousel with remote streams
- [ ] Responsive breakpoints (fewer items on mobile)
- [ ] Active speaker highlight
- [ ] Click to pin participant

#### 4. Chat Room (Embedded in Home Page)
**Status:** Basic structure exists, not functional  
**Location:** `home.component.ts`, need `chat-room` component  
**What needs to be done:**
- [ ] Create `ChatRoomComponent` for embedded chat rooms
- [ ] Implement chat room creation (separate from meeting rooms)
- [ ] Chat room embedded cards in Home Page
- [ ] Expand/collapse chat room card
- [ ] Chat functionality within embedded rooms
- [ ] File sharing in chat rooms
- [ ] Host controls (kick/ban) in chat rooms

#### 5. Complete P2P Data Channels
**Status:** Basic structure exists  
**Location:** `peer.service.ts`, `room.service.ts`  
**What needs to be done:**
- [ ] Test DataConnection establishment between peers
- [ ] Implement reliable message delivery
- [ ] Handle peer disconnection and cleanup
- [ ] Implement "history sync" for late joiners:
  - When new peer joins, send all existing messages
  - Send file metadata and offer file data
- [ ] Implement "file-request" protocol for late joiners to request files

### Medium Priority

#### 6. File Transfer UI & Progress
**Status:** Service exists, UI not integrated  
**Location:** `file-transfer.service.ts`, `file-upload.component.ts`  
**What needs to be done:**
- [ ] Connect FileTransferService to PeerService
- [ ] Show transfer progress bar
- [ ] Display shared files in chat
- [ ] File download button for received files
- [ ] Handle large file warning (SweetAlert)
- [ ] Test 50MB+ file transfer

#### 7. Emoji Picker in Chat
**Status:** Not started  
**Location:** Need `@ctrl/ngx-emoji-mart` integration  
**What needs to be done:**
- [ ] Install `@ctrl/ngx-emoji-mart`
- [ ] Create emoji picker toggle button in chat
- [ ] Insert selected emoji into message input
- [ ] Position emoji picker popup correctly

#### 8. Active Speaker Detection
**Status:** Not started  
**Location:** Create `ActiveSpeakerService`  
**What needs to be done:**
- [ ] Use Web Audio API `AudioContext` and `AnalyserNode`
- [ ] Calculate RMS volume for each participant's audio stream
- [ ] Debounce speaker changes (hold for 2 seconds)
- [ ] Broadcast active speaker ID to all peers
- [ ] Auto-switch big screen to active speaker

#### 9. Media Sync ("Watch Together" Feature)
**Status:** Service exists, not integrated  
**Location:** `media-sync.service.ts`, Meeting Room  
**What needs to be done:**
- [ ] Host pastes media URL (audio/video)
- [ ] Broadcast "media-sync" with URL and current time
- [ ] All peers load media in big screen
- [ ] Host controls (play/pause/seek) broadcast to all
- [ ] Sync tolerance: 500ms
- [ ] Lock all peers to big screen during media playback

### Low Priority

#### 10. PWA Icons & Manifest
**Status:** Basic PWA added, needs proper icons  
**Location:** `manifest.webmanifest`, `src/assets/icons/`  
**What needs to be done:**
- [ ] Generate all icon sizes (72, 96, 128, 144, 192, 384, 512)
- [ ] Update manifest with correct icon paths
- [ ] Test PWA install prompt
- [ ] Configure "ngsw-config.json" for caching
- [ ] Test offline functionality

#### 11. Responsive Design & Mobile Optimization
**Status:** Basic Tailwind responsive classes added  
**What needs to be done:**
- [ ] Test on mobile viewports (320px to 4K)
- [ ] Meeting room mobile layout:
  - Big screen full width
  - Carousel horizontal scroll below video
  - Chat as bottom sheet
  - Controls as compact icon-only on mobile
- [ ] Home page mobile: stacked cards
- [ ] Touch-friendly tap targets (min 44x44px)

#### 12. QR Scanner for Mobile
**Status:** Not started  
**Location:** Need `@zxing/ngx-scanner` integration  
**What needs to be done:**
- [ ] Add QR scanner button next to GUID input
- [ ] Open camera scanner on mobile
- [ ] Auto-fill GUID from scanned QR code
- [ ] Fallback to manual input on desktop

---

## Build Instructions

### Prerequisites
```bash
node --version  # Should be 20+
npm --version   # Should be 10+
```

### Install Dependencies
```bash
cd C:\Users\Md. Nafis Sadik\Documents\Projects\Callix
npm install
```

### Run Development Server
```bash
npx ng serve --port 4200
# Visit http://localhost:4200/
```

### Build for Production
```bash
npx ng build --configuration production
# Output in dist/callix-app/
```

---

## Key File Locations

### Models
- `src/app/core/models/user.model.ts`
- `src/app/core/models/room.model.ts`
- `src/app/core/models/message.model.ts`
- `src/app/core/models/peer-message.model.ts`

### Services
- `src/app/core/services/auth.service.ts`
- `src/app/core/services/peer.service.ts`
- `src/app/core/services/room.service.ts`
- `src/app/core/services/encryption.service.ts`
- `src/app/core/services/file-transfer.service.ts`
- `src/app/core/services/media-sync.service.ts`
- `src/app/core/services/recording.service.ts`
- `src/app/core/services/theme.service.ts`
- `src/app/core/services/alert.service.ts`

### Components
- `src/app/features/auth/login/login.ts`
- `src/app/features/home/home.ts`
- `src/app/features/meeting-room/meeting-room/meeting-room.ts`
- `src/app/shared/components/navbar/navbar.component.ts`
- `src/app/shared/components/theme-toggle/theme-toggle.component.ts`
- `src/app/shared/components/qr-code-modal/qr-code-modal.component.ts`
- `src/app/shared/components/file-upload/file-upload.component.ts`

### Config
- `src/styles.css` - Main styles with theme tokens
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS config
- `angular.json` - Angular project config
- `package.json` - Dependencies

---

## Known Issues & Notes

### 1. Sass Deprecation Warning
**Issue:** `@import` rules in styles.css trigger deprecation warning  
**Fix:** The project uses TailwindCSS 3.x with `@import url("tailwindcss")` which is the correct syntax for v3. The warning is from an internal check. It doesn't affect functionality.

### 2. ECDH Key Exchange
**Issue:** Code was written but caused build errors due to:
- `async` method with `void` return type
- PeerMessageType not including `'key-exchange'`

**Fix approach:**
1. Add `'key-exchange'` to PeerMessageType in `peer-message.model.ts`
2. Create properly typed methods in PeerService
3. Test incrementally

### 3. PeerJS Cloud Dependency
**Note:** The app uses PeerJS cloud for signaling. For production:
- Consider self-hosted PeerJS server
- Add TURN server for NAT traversal (coturn)
- Update iceServers in PeerService

### 4. Browser Compatibility
**Note:** Some features vary by browser:
- Screen sharing: Requires HTTPS or localhost
- Recording: Format availability varies
- WebRTC: Check browser support for used APIs

---

## Next Steps for Next AI

### Immediate (High Priority)
1. **Fix ECDH key exchange:**
   - Read `src/app/core/services/peer.service.ts`
   - Add the ECDH methods (see section above)
   - Test encrypted messaging between two browser tabs

2. **Complete video display:**
   - Read `meeting-room.component.ts`
   - Fix remote stream display in template
   - Test with two peers connecting

3. **Implement Owl Carousel:**
   - `npm install ngx-owl-carousel-o`
   - Create `participant-carousel` component
   - Replace basic div carousel in meeting room

### Medium Priority
4. Build Chat Room embedded component
5. Add emoji picker to chat
6. Implement active speaker detection
7. Complete file transfer UI

### Testing Checklist
- [ ] Two peers can connect via room GUID
- [ ] Messages sync between peers
- [ ] File transfer works (small and large files)
- [ ] Screen sharing works
- [ ] Recording downloads correctly
- [ ] Host can approve/deny join requests
- [ ] Ban/unban functionality works
- [ ] Theme switching works (light/dark/system)
- [ ] QR code generates and copies correctly
- [ ] PWA installs correctly

---

## Development Server
**Currently running at:** `http://localhost:4200/`  
**To restart:** `npx ng serve --port 4200`

---

**Good luck to the next AI! 🚀**
