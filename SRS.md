# Callix — Software Requirements Specification

## Version History
| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-05-15 | Initial SRS based on codebase v1.0 |

---

## 1. Introduction

### 1.1 Purpose
Callix is a zero-backend, peer-to-peer enterprise communication platform. All communication — voice, video, screen share, chat, and file sharing — occurs directly between participants via WebRTC. There is no server-side data persistence, no database, and no backend.

### 1.2 Scope
This document covers the functional and non-functional requirements for the Callix PWA. It describes all features, system behavior, user roles, architectural constraints, and the current implementation status of each requirement.

### 1.3 Definitions
| Term | Definition |
|------|------------|
| P2P | Peer-to-peer — direct connection between browsers |
| Host | The user who creates a room; controls room lifecycle |
| Guest | A user who joins an existing room |
| GUID | Globally Unique Identifier (UUID v4) used as room/user ID |
| DataChannel | WebRTC data channel for non-media communication |
| MediaStream | WebRTC media stream for audio/video |
| Room | A virtual meeting or chat space; exists only while host is connected |

---

## 2. Overall Description

### 2.1 Product Perspective
Callix is a standalone Progressive Web Application with no backend dependency. It uses PeerJS for WebRTC signaling and connection establishment. All data lives in-memory within service signals and is destroyed when the host leaves the room.

### 2.2 User Classes
| Class | Description |
|-------|-------------|
| Host | Creates rooms, manages participants (approve/deny/kick/ban), controls media sync |
| Guest | Joins rooms via GUID, participates in chat/calls/file sharing |

### 2.3 Operating Environment
- **Browser:** Modern Chromium-based browsers, Firefox, Safari (WebRTC support required)
- **Platform:** Desktop and mobile via PWA installation
- **Network:** Internet connection required for PeerJS signaling; P2P media/data direct

### 2.4 Design and Implementation Constraints
- Zero backend — no server-side logic or persistence
- Mesh topology — each peer connects to every other peer
- In-memory only — all data lost on room destruction
- No authentication backend — user identity generated client-side via `crypto.randomUUID()`
- PeerJS cloud signaling — depends on PeerJS availability

---

## 3. Functional Requirements

### 3.1 Authentication (Placeholder)

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| AUTH-01 | User enters a display name to "sign in" | ✅ Implemented | LoginComponent with display name input |
| AUTH-02 | User GUID is generated via `crypto.randomUUID()` | ✅ Implemented | |
| AUTH-03 | User session persisted in localStorage under `callix-user` | ✅ Implemented | |
| AUTH-04 | After login, user is redirected to `/home` | ✅ Implemented | |
| AUTH-05 | Auth guard protects `/home`, `/meeting/:roomId`, `/chat/:roomId` | ✅ Implemented | Redirects to `/login` if not authenticated |

### 3.2 Home Page

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| HOME-01 | Hub page after login at `/home` | ✅ Implemented | |
| HOME-02 | Navbar with logo, display name, theme toggle, logout | ✅ Implemented | NavbarComponent |
| HOME-03 | Start Meeting CTA | ✅ Implemented | Navigates to create room flow |
| HOME-04 | Join Room section with GUID input + QR scan + Join button | ✅ Implemented | Uses `html5-qrcode` |
| HOME-05 | My Chat Rooms section with glass cards | ✅ Implemented | Dismissible cards with participant/message count |
| HOME-06 | New Chat Room button | ✅ Implemented | |
| HOME-07 | Chat rooms embedded on Home Page | ✅ Implemented | |
| HOME-08 | Meeting rooms open in dedicated full-screen route | ✅ Implemented | |

### 3.3 Meeting Rooms

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| MTG-01 | Create meeting room with GUID | ✅ Implemented | |
| MTG-02 | Host auto-joined as first participant | ✅ Implemented | |
| MTG-03 | GUID displayed in Room Info modal | ✅ Implemented | QR code modal |
| MTG-04 | Copy GUID to clipboard | ✅ Implemented | |
| MTG-05 | Generate and download QR code | ✅ Implemented | |
| MTG-06 | Join by GUID with join request flow | ✅ Implemented | Guest sends request, host approves/denies |
| MTG-07 | Full-duplex audio via WebRTC | ✅ Implemented | |
| MTG-08 | Full-duplex video via WebRTC | ✅ Implemented | |
| MTG-09 | Screen sharing via `getDisplayMedia` | ✅ Implemented | |
| MTG-10 | Real-time text chat via DataChannel | ✅ Implemented | ChatPanelComponent |
| MTG-11 | P2P file transfer via DataChannel with chunking | ✅ Implemented | 16KB chunks |
| MTG-12 | Client-side recording via MediaRecorder API | ✅ Implemented | RecordingService |
| MTG-13 | Download recording | ✅ Implemented | |
| MTG-14 | Participant video tiles/carousel | ✅ Implemented | Bottom carousel strip |
| MTG-15 | Pin a participant to big screen | ✅ Implemented | Click tile to pin |
| MTG-16 | Active speaker detection | ⚠️ Stub | Selects first remote stream; not true detection |
| MTG-17 | Screen share auto big-screen | ✅ Implemented | |
| MTG-18 | Host-only media URL playback | ✅ Implemented | MediaPlayerModal |
| MTG-19 | Media sync across participants | ✅ Implemented | MediaSyncService |
| MTG-20 | Encryption algorithm selection at creation | ⚠️ Cosmetic | Only AES-GCM works; others are UI-only |
| MTG-21 | Emoji keyboard in chat | ❌ Not implemented | Not in dependencies |
| MTG-22 | Unlimited participants | ✅ Implemented | Mesh topology; degrades past ~10 |
| MTG-23 | Unlimited duration | ✅ Implemented | As long as host stays connected |

### 3.4 Host Controls

#### 3.4.1 Meeting Room Host Controls

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| HC-M-01 | Approve individual join requests | ✅ Implemented | |
| HC-M-02 | Deny individual join requests | ✅ Implemented | |
| HC-M-03 | Approve all pending requests | ✅ Implemented | |
| HC-M-04 | Deny all pending requests | ✅ Implemented | |
| HC-M-05 | Kick participant with notification to kicked user | ✅ Implemented | `handleKicked()` shows modal |
| HC-M-06 | Auto-ban on kick | ✅ Implemented | `completeKick()` calls `banUser()` |
| HC-M-07 | Manually ban a user | ❌ Not implemented | No UI for manual ban |
| HC-M-08 | View ban list | ✅ Implemented | Banned tab in ParticipantsPanel |
| HC-M-09 | Unban individual | ✅ Implemented | |
| HC-M-10 | Unban all | ✅ Implemented | |
| HC-M-11 | Host-only media URL playback | ✅ Implemented | MediaPlayerModal |
| HC-M-12 | Host leaves — room destroyed — guests notified | ✅ Implemented | `showRoomDestroyed()` modal |

#### 3.4.2 Chat Room Host Controls

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| HC-C-01 | Approve individual join requests | ✅ Implemented | |
| HC-C-02 | Deny individual join requests | ✅ Implemented | |
| HC-C-03 | Approve all pending requests | ✅ Implemented | |
| HC-C-04 | Deny all pending requests | ✅ Implemented | |
| HC-C-05 | Kick participant with notification to kicked user | ✅ Implemented | |
| HC-C-06 | Auto-ban on kick | ✅ Implemented | |
| HC-C-07 | View ban list | ✅ Implemented | |
| HC-C-08 | Unban individual | ✅ Implemented | |
| HC-C-09 | Unban all | ✅ Implemented | |
| HC-C-10 | Host leaves — room destroyed — guests notified | ✅ Implemented | |

### 3.5 Chat Rooms

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| CR-01 | Create chat room with GUID | ✅ Implemented | |
| CR-02 | Host auto-joined as first participant | ✅ Implemented | |
| CR-03 | Chat rooms as cards on Home Page | ✅ Implemented | Embedded view |
| CR-04 | GUID shown in chat room card | ✅ Implemented | |
| CR-05 | Share GUID via copy or QR | ✅ Implemented | |
| CR-06 | Join via GUID with request flow | ✅ Implemented | |
| CR-07 | Real-time text chat via DataChannel | ✅ Implemented | |
| CR-08 | P2P file sharing with large-file warning | ✅ Implemented | 50MB threshold |
| CR-09 | Emoji keyboard | ❌ Not implemented | |
| CR-10 | Room destroyed when host leaves | ✅ Implemented | |
| CR-11 | No audio/video/screen share/recording | ✅ Implemented | |
| CR-12 | Encryption algorithm selection | ✅ Implemented | UI dropdown |
| CR-13 | Minimal card-based UI on Home Page | ✅ Implemented | ChatRoomComponent at `/chat/:roomId` |

### 3.6 File Sharing

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| FS-01 | P2P transfer via DataChannel chunking (16KB) | ✅ Implemented | FileTransferService |
| FS-02 | Large file warning >50MB | ✅ Implemented | AlertService |
| FS-03 | Proceed or cancel option | ✅ Implemented | |
| FS-04 | Files available while room exists | ✅ Implemented | In-memory |
| FS-05 | No persistence after room destruction | ✅ Implemented | |
| FS-06 | Transfer progress bar | ✅ Implemented | `transferProgress` signal |

### 3.7 Late-Join Sync

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| SYNC-01 | Host sends full message history to new joiner | ✅ Implemented | `sendHistorySync()` |
| SYNC-02 | File metadata sent to new joiner | ✅ Implemented | |
| SYNC-03 | Files in memory offered to new joiner | ⚠️ Partial | Metadata sent; actual file data transfer via `file-request` |
| SYNC-04 | "Syncing..." indicator before room entry | ❌ Not implemented | No loading state |
| SYNC-05 | Pure P2P mesh sync | ✅ Implemented | |

### 3.8 Theming

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| TH-01 | Light mode | ✅ Implemented | |
| TH-02 | Dark mode | ✅ Implemented | |
| TH-03 | System mode (follows OS preference) | ✅ Implemented | |
| TH-04 | Preference stored in localStorage | ✅ Implemented | |
| TH-05 | Smooth CSS transitions on theme switch | ✅ Implemented | 150ms |
| TH-06 | Colors from centralized CSS token system | ✅ Implemented | CSS custom properties |

### 3.9 PWA

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| PWA-01 | Installable from browser | ✅ Implemented | Manifest present |
| PWA-02 | Offline app shell | ❌ Not implemented | No service worker config |
| PWA-03 | Full-screen mode, splash screen, manifest | ⚠️ Partial | Manifest present; splash screen not configured |
| PWA-04 | Service worker registered | ❌ Not implemented | |
| PWA-05 | Fully responsive (320px to 4K) | ⚠️ Partial | Basic responsive layout |

### 3.10 Security & Encryption

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| SEC-01 | All room communication E2E encrypted | ❌ **Not working** | `encrypted` flag hardcoded to `false` |
| SEC-02 | Algorithms: AES-GCM-256, AES-CBC-256, ChaCha20-Poly1305 | ⚠️ Partial | Only AES-GCM implemented; others UI-only |
| SEC-03 | ECDH key exchange via PeerJS signaling | ✅ Implemented | Works correctly |
| SEC-04 | Unique key per room | ✅ Implemented | |
| SEC-05 | Keys exist only in memory; destroyed with room | ✅ Implemented | `clearKeys()` on room destroy |

---

## 4. Non-Functional Requirements

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-01 | No backend dependency | ✅ Met | Pure client-side Angular |
| NFR-02 | Mesh P2P topology | ✅ Met | Each peer connects to every other |
| NFR-03 | In-memory state only | ✅ Met | Angular signals |
| NFR-04 | No data persistence between sessions | ✅ Met | Except user identity in localStorage |
| NFR-05 | Glassmorphism design system | ✅ Met | CSS custom properties |
| NFR-06 | Angular 21 standalone components | ✅ Met | |
| NFR-07 | PrimeNG UI library | ✅ Met | Lara theme, ConfirmDialog, Toast, FileUpload |
| NFR-08 | Tailwind CSS v4 styling | ✅ Met | |

---

## 5. System Models

### 5.1 User Model
```
{
  id: string;          // UUID v4
  displayName: string; // User-chosen name
  peerId: string;      // PeerJS peer ID
  avatar?: string;     // Optional avatar URL
  isHost?: boolean;    // Host flag
}
```

### 5.2 Room Model
```
{
  id: string;                    // UUID v4
  type: 'meeting' | 'chat';     // Room type
  name: string;                  // Room display name
  hostId: string;                // Host user ID
  encryptionAlgorithm: string;   // Algorithm or 'none'
  participants: Map<string, User>;
  banList: Set<string>;          // Banned user IDs
  pendingRequests: Map<string, JoinRequest>;
  messages: Message[];
  sharedFiles: SharedFile[];
  mediaPlayback?: MediaPlayback;
  createdAt: number;
}
```

### 5.3 Peer Message Protocol
```
{
  type: PeerMessageType;  // 22 message types
  payload: any;
  timestamp: number;
  senderId: string;
  encrypted: boolean;     // Always false (bug)
}
```

### 5.4 Message Types
`chat | file-meta | file-chunk | file-complete | join-request | join-response | kick | kick-confirmation | ban | unban | room-destroyed | participant-update | ban-list-sync | media-sync | screen-share-start | screen-share-stop | active-speaker | system | history-sync | file-request | key-exchange | key-exchange-response`

---

## 6. Known Bugs and Gaps

| # | Description | Severity | Area |
|---|-------------|----------|------|
| B-01 | E2E encryption non-functional — `encrypted` always `false` | Critical | Security |
| B-02 | No `participant-update` broadcast when new user joins | High | Room sync |
| B-03 | Guest voluntarily leaving triggers kicked modal (fixed in b82cefb) | High | Room logic |
| B-04 | `approveAll()` doesn't broadcast participant updates | High | Room sync |
| B-05 | `banUser()` doesn't self-broadcast (fragile dependency) | Low | Room sync |
| B-06 | `'ban'`/`'unban'` message handlers are dead code | Low | Maintenance |
| B-07 | Algorithm options beyond AES-GCM are cosmetic | Low | Encryption |
| B-08 | No unit tests for any service | Medium | Quality |
| B-09 | No offline shell / service worker | Low | PWA |
| B-10 | Active speaker detection is a stub | Low | Meeting |

---

## 7. Meal Lifecycle oll

```
Host creates room
  → GUID generated
  → Host auto-joined as first participant
  → Host shares GUID

Guest enters GUID
  → Join request sent to host via DataChannel
  → Host approves/denies

If approved:
  → ECDH key exchange (host ↔ guest)
  → History sync sent (messages, files, participants)
  → Guest enters room
  → Room active

Host leaves:
  → 'room-destroyed' broadcast to all guests
  → All peers disconnect
  → Room state destroyed

Guest kicked:
  → 'kick' message sent to guest
  → Guest receives kick modal
  → Guest removed from participants
  → Guest auto-banned
  → 'participant-update' and 'ban-list-sync' broadcast to remaining
