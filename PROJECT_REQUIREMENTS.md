# Callix — Project Details & Requirement Analysis

## 1. Project Overview

**Project Name:** Callix  
**Type:** Progressive Web Application (PWA)  
**Description:** A P2P enterprise communication platform — no backend, no server-side data persistence. All communication (voice, video, screen share, chat, file sharing) happens directly between participants using WebRTC. Designed for enterprise use: professional, trustworthy, and efficient.

**Core Philosophy:** Zero backend, no data persistence, E2E encryption, no limits on participants or duration, enterprise-grade premium UI with glassmorphism and a centralized theme system.

---

## 2. Technology Stack

| Layer | Technology | License |
|---|---|---|
| Framework | Angular 19+ | MIT |
| Styling | TailwindCSS v3 | MIT |
| Animations | animate.css | MIT |
| Alerts | SweetAlert2 | MIT |
| Icons | Lucide Angular | ISC |
| Carousel | ngx-owl-carousel-o | MIT |
| P2P/WebRTC | PeerJS | MIT |
| Emoji Picker | @ctrl/ngx-emoji-mart | MIT |
| QR Code Gen | angularx-qrcode | MIT |
| QR Scanner | @zxing/ngx-scanner | MIT |
| Recording | Native MediaRecorder API | Built-in |
| PWA | @angular/pwa | MIT |
| Encryption | Web Crypto API + tweetnacl.js | Built-in / Public Domain |

All libraries are open-source and free for commercial use.

---

## 3. Design System

### 3.1 Visual Language

Callix follows an **enterprise glassmorphism** aesthetic — professional, calm, and functional. Inspired by the intersection of Microsoft Teams and Linear.app:

- **Glassmorphism**: All card-style UI elements (panels, modals, sidebars, room cards) use `backdrop-filter: blur()`, translucent backgrounds, and a soft border glow.
- **Subtle Gradients**: Directional, muted gradients — not neon or rainbow. The visual language feels like frosted glass layered over a deep background.
- **No decorative excess**: Animations are subtle, quick (150–250ms), and purposeful. No spinning loaders or playful bounces.
- **Clean typographic hierarchy**: Use **Inter** or **IBM Plex Sans**. Weights: 400 (body), 500 (label), 600 (heading).

### 3.2 Color Palette (Centralized — No Hardcoded Colors)

All color values must come from the theme token system. Components must reference tokens, never raw hex values.

| Token | Light Mode Value | Dark Mode Value | Purpose |
|---|---|---|---|
| `--color-primary` | `#4F6AF0` | `#4F6AF0` | CTA buttons, active states, focus rings |
| `--color-primary-dark` | `#3B4FBF` | `#3B4FBF` | Hover/pressed primary |
| `--color-accent` | `#6EC6CA` | `#6EC6CA` | Badges, subtle icons, highlights |
| `--color-surface` | `#F4F6FB` | `#12151F` | Page background |
| `--color-glass-bg` | `rgba(255,255,255,0.55)` | `rgba(18,21,31,0.55)` | Glass card backgrounds |
| `--color-glass-border` | `rgba(79,106,240,0.18)` | `rgba(110,198,202,0.15)` | Glass card borders |
| `--color-text-primary` | `#1A1D2E` | `#E8ECF4` | Primary readable text |
| `--color-text-secondary` | `#5A6072` | `#8A94B0` | Supporting labels, timestamps |
| `--color-success` | `#34C784` | `#34C784` | Online indicators, success toasts |
| `--color-warning` | `#F5A623` | `#F5A623` | File size warnings, caution |
| `--color-danger` | `#E8445A` | `#E8445A` | Kick, ban, leave, error |
| `--gradient-bg` | `linear-gradient(135deg, #EEF1FB 0%, #F4F6FF 100%)` | `linear-gradient(135deg, #12151F 0%, #1A2035 100%)` | Full-page gradient bg |

### 3.3 Glassmorphism Rules

Apply to: cards, modals, sidebars, panels, chat rooms on home page, meeting toolbar.

```css
background: var(--color-glass-bg);
backdrop-filter: blur(16px) saturate(180%);
-webkit-backdrop-filter: blur(16px) saturate(180%);
border: 1px solid var(--color-glass-border);
border-radius: 14px;
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
```

---

## 4. Feature Catalog

### 4.1 Authentication (Placeholder)

- AUTH-01: Social Login Button (Google) — UI-only; generates user GUID in localStorage
- AUTH-02: Sign Up Button — UI-only; generates new user GUID
- AUTH-03: User GUID persisted in localStorage until cleared
- AUTH-04: After login, user is redirected to the **Home Page**
- AUTH-05: Future-ready for server-side GUID generation for monetization

### 4.2 Home Page Architecture

- HOME-01: After login, user lands on the **unified Home Page** — main hub of the application
- HOME-02: Top Navbar: app logo, user display name, theme toggle, logout
- HOME-03: **Start Meeting** CTA — navigates user to the Create Meeting flow, then to Meeting Room
- HOME-04: **Join a Room** section — input field for GUID + QR scan button + Join button (navigates to Meeting Room if GUID is meeting type)
- HOME-05: **My Chat Rooms** section — active chat rooms the user hosts or has joined appear as dismissible glass cards with last message preview and participant count
- HOME-06: **New Chat Room** button — opens an inline or modal create-chat-room flow; new room appears in the Chat Rooms section
- HOME-07: Chat rooms are embedded in the Home Page — they do not navigate away
- HOME-08: Meeting rooms are full-screen and opened in a dedicated route

### 4.3 Meeting Rooms

- MTG-01: Create Meeting Room — GUID generated for the room
- MTG-02: **Host is automatically joined as the first participant** — no separate join step required after creation
- MTG-03: **GUID is displayed inside the Meeting Room page** — accessible via a "Room Info" button in the controls toolbar; opens a modal with: GUID, copy button, QR code, download QR button
- MTG-04: Copy GUID to clipboard
- MTG-05: Generate and download QR code of room GUID
- MTG-06: Join by typing/scanning GUID — sends join request to Host
- MTG-07: Full-duplex audio via WebRTC
- MTG-08: Full-duplex video via WebRTC
- MTG-09: Screen sharing via getDisplayMedia
- MTG-10: Real-time text chat via DataChannel
- MTG-11: P2P file transfer via DataChannel with chunking
- MTG-12: Client-side recording via MediaRecorder API
- MTG-13: Download recording before room destruction
- MTG-14: Participant video tiles in Owl Carousel
- MTG-15: Pin a participant to personal big-screen view
- MTG-16: Active speaker detection — auto big-screen
- MTG-17: Screen share auto big-screen mode
- MTG-18: Host-only media URL playback (audio/video)
- MTG-19: Media sync lock — all devices lock to big-screen
- MTG-20: Encryption algorithm selection dropdown at room creation
- MTG-21: Emoji keyboard in chat panel
- MTG-22: Unlimited participants
- MTG-23: Unlimited duration

### 4.4 Host Controls

- HC-01: Approve individual join requests
- HC-02: Deny individual join requests
- HC-03: Approve all pending requests
- HC-04: Deny all pending requests
- HC-05: Kick participant — SweetAlert shown to kicked user
- HC-06: Auto-ban on kick
- HC-07: Manually ban a user
- HC-08: View ban list
- HC-09: Unban individual
- HC-10: Unban all
- HC-11: Host leaves — room destroyed — all guests get SweetAlert

### 4.5 Chat Rooms

- CR-01: Create Chat Room — GUID generated
- CR-02: **Host is automatically joined as the first participant** — no separate join step after creation
- CR-03: Chat rooms appear as cards in the **Home Page "My Chat Rooms" section** — they do not navigate to a separate route
- CR-04: **GUID is shown in the chat room card header or sidebar** for sharing
- CR-05: Share GUID via copy or QR code
- CR-06: Join via GUID — join request
- CR-07: Real-time text chat via DataChannel
- CR-08: P2P file sharing with large-file warning
- CR-09: Emoji keyboard
- CR-10: Same host controls as meeting rooms
- CR-11: Room destroyed when host leaves
- CR-12: NO audio, video, screen sharing, or recording
- CR-13: Encryption algorithm selection
- CR-14: Minimal, card-based lightweight UI embedded in the Home Page

### 4.6 File Sharing

- FS-01: P2P transfer via DataChannel chunking (16KB chunks)
- FS-02: Large file warning (>50MB) via SweetAlert
- FS-03: Proceed or cancel option
- FS-04: Files available as long as room exists
- FS-05: No persistence after room destruction
- FS-06: Transfer progress bar

### 4.7 Guest Message & File Sync (Late Join P2P Sync)

- SYNC-01: When a guest joins a room that has existing messages, the host (or nearest peer) sends the full message history to the new joiner via P2P DataChannel
- SYNC-02: File metadata for all files shared in the room is also sent to the new joiner
- SYNC-03: Files already in memory at existing peers are offered for download to the new joiner (peer offers the ArrayBuffer data over the DataChannel)
- SYNC-04: The sync happens before the new participant is shown the room content (show a brief "Syncing…" indicator)
- SYNC-05: No server involved — pure P2P mesh sync

### 4.8 Theming

- TH-01: Light Mode
- TH-02: Dark Mode
- TH-03: System Mode (follows OS prefers-color-scheme)
- TH-04: Preference stored in localStorage
- TH-05: Smooth CSS transitions on theme switch (150ms)
- TH-06: All colors sourced from the centralized CSS token system — no hardcoded values

### 4.9 PWA

- PWA-01: Installable from browser (desktop and mobile)
- PWA-02: Offline app shell loading
- PWA-03: Full-screen mode, splash screen, app icon, manifest
- PWA-04: Service worker registered
- PWA-05: Fully responsive (320px to 4K)

### 4.10 Security & Encryption

- SEC-01: All room communication is E2E encrypted
- SEC-02: Algorithms: AES-GCM-256, AES-CBC-256, ChaCha20-Poly1305
- SEC-03: ECDH key exchange via PeerJS signaling
- SEC-04: Unique key per room
- SEC-05: Keys exist only in memory; destroyed with room

---

## 5. User Roles

| Role | Description |
|---|---|
| Host | Creates room, auto-joined as first participant, full control, room lifecycle tied to host |
| Guest | Joins via GUID, receives full message/file sync on join, can chat/share/call, no admin controls |

---

## 6. Room Lifecycle

```
Host creates room -> GUID generated -> Host auto-joined as first participant
-> Host shares GUID -> Guest enters GUID -> Join request sent -> Host approves/denies
-> Guest joins (if approved) -> Guest receives P2P sync of all messages & files
-> Guest enters room -> Room active
-> Host leaves -> Room destroyed -> All guests disconnected + SweetAlert
```

**Rules:** Room exists ONLY while host is connected. Ban list per-room, starts empty. No data survives destruction. Kicked users auto-banned.

---

## 7. UI/UX Requirements

### 7.1 Design Principles

- **Enterprise-grade**: Professional, trustworthy, functional. Inspired by Microsoft Teams + Linear.app.
- **Glassmorphism**: All card/panel/modal surfaces use frosted glass treatment (see Section 3.3).
- **Theme-bound**: Every color in the UI comes from the centralized token system (see Section 3.2).
- **Subtle animations**: animate.css used sparingly. Transitions: 150–250ms. No looping or decorative animations.
- **Accessible**: ARIA labels, keyboard navigation, minimum 4.5:1 contrast ratio on all text.
- **Responsive**: Mobile-first, tested from 320px to 4K.

### 7.2 Key Screens

| Screen | Type | Notes |
|---|---|---|
| Login Page | Full-screen | Glassmorphism card on gradient background; logo, tagline, social login buttons |
| Home Page | Hub | Navbar + Start Meeting CTA + Join Room input + My Chat Rooms section with live room cards |
| Create Room (Meeting) | Modal or dedicated page | Room name, encryption selector, "Create & Join" button |
| Create Chat Room | Inline modal on Home Page | Same fields; on submit, adds room card to My Chat Rooms section |
| Meeting Room | Full-screen | Big screen + carousel + chat sidebar + controls toolbar + Room Info button |
| Chat Room Card (on Home) | Embedded glass card | Message list, file sharing, emoji, participant count, host controls |
| Join Request Panel | Host overlay/modal | Approve/deny individual and batch |
| Ban List Panel | Host modal | Unban individual/all, empty state |
| Room Info Modal (Meeting) | In-room modal | GUID display, copy, QR code, download QR |

---

## 8. P2P Architecture

### Signaling
PeerJS provides signaling (cloud or self-hosted). Only server component — used only to establish WebRTC connections.

### Topology
Mesh Network: each peer connects to every other peer with DataChannel + MediaStream.

### Message Protocol
```json
{
  "type": "chat | file-meta | file-chunk | file-complete | join-request | join-response | kick | ban | unban | room-destroyed | participant-update | media-sync | screen-share-start | screen-share-stop | active-speaker | history-sync | system",
  "payload": "any",
  "timestamp": "number",
  "senderId": "string",
  "encrypted": "boolean"
}
```

---

## 9. Data Models (In-Memory Only)

### User
```
{ id: GUID, displayName: string, peerId: string, avatar?: string, isHost: boolean }
```

### Room
```
{ id: GUID, type: meeting|chat, hostId: GUID, encryptionAlgorithm: string,
  encryptionKey: CryptoKey, participants: Map<string, User>, banList: Set<string>,
  pendingRequests: Map<string, JoinRequest>, messages: Message[], sharedFiles: SharedFile[],
  mediaPlayback?: MediaPlayback, createdAt: number }
```

### Message
```
{ id: string, senderId: GUID, senderName: string, content: string,
  timestamp: number, type: text|file|system }
```

### SharedFile
```
{ id: string, name: string, size: number, mimeType: string,
  senderId: GUID, data: ArrayBuffer, timestamp: number }
```

### HistorySyncPayload
```
{ messages: Message[], files: SharedFileMetadata[], participants: User[] }
```

---

## 10. Encryption Specification

### Key Exchange Flow
1. Host generates room key using Web Crypto API
2. On peer join, host performs ECDH key exchange
3. Shared secret derived; room key encrypted with shared secret and sent
4. All subsequent messages encrypted with room key
5. History sync messages are encrypted with the same room key

### File Transfer Protocol
1. Sender selects file
2. If >50MB: SweetAlert warning with proceed/cancel
3. File metadata sent as `file-meta` message
4. File split into 16KB chunks sent as `file-chunk` messages
5. Final chunk sends `file-complete` signal
6. Receiver reassembles and stores in memory

### Late-Join Sync Protocol
1. New peer sends `join-request`
2. Host approves — sends `history-sync` message containing all messages + file metadata + current participant list
3. If file data is available in memory, host/peer sends file chunks on request
4. New peer displays "Syncing…" spinner until sync complete message received
5. Peer enters room

### Media Sync Protocol (Meeting Rooms Only)
1. Host pastes URL — broadcasts `media-sync` load message
2. All peers load media in big-screen mode
3. Host controls playback — broadcasts play/pause/seek
4. Peers sync within 500ms tolerance
5. Host stops — peers unlock from big-screen

---

## 11. Constraints and Limitations

| Constraint | Impact |
|---|---|
| No backend | No persistent storage or server processing |
| Mesh topology | Degrades with 10+ participants |
| P2P file transfer | Large files slow |
| Browser APIs | Screen sharing/recording varies by browser |
| PeerJS signaling | Depends on PeerJS cloud availability |
| History sync size | Very large message/file histories may slow down join |

---

## 12. Future Considerations (Out of Scope)

- Backend for auth and monetization
- Database for user profiles
- TURN server for NAT traversal
- SFU for scaling beyond 10 participants
- Push notifications, meeting scheduling
- Virtual backgrounds, noise cancellation
- SFU-based selective history sync for large rooms
