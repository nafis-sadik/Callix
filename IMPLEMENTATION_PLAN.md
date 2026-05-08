# Callix — Execution & Implementation Plan

> **Prerequisites:** Node.js 20+, npm 10+, Angular CLI (`npm i -g @angular/cli`)
> **Root directory** `d:\Personal Repos\Callix` IS the Angular project root.

---

## Phase 0: Project Scaffolding

### Step 0.1 — Initialize Angular Project in Root

```bash
# From inside d:\Personal Repos\Callix
ng new callix --directory ./ --routing --style scss --ssr false --skip-git
```

If the CLI complains about existing files, use `--force`. The `.gitignore` and `README.md` already exist.

### Step 0.2 — Install Dependencies

```bash
# TailwindCSS
npm install -D tailwindcss @tailwindcss/forms postcss autoprefixer
npx tailwindcss init

# Animations
npm install animate.css

# Alerts
npm install sweetalert2

# Icons
npm install lucide-angular

# Carousel
npm install ngx-owl-carousel-o

# P2P
npm install peerjs

# Emoji
npm install @ctrl/ngx-emoji-mart

# QR Code
npm install angularx-qrcode
npm install @zxing/browser @zxing/library @zxing/ngx-scanner

# Encryption
npm install tweetnacl tweetnacl-util

# UUID
npm install uuid
npm install -D @types/uuid
```

### Step 0.3 — Add PWA Support

```bash
ng add @angular/pwa
```

This adds `manifest.webmanifest`, `ngsw-config.json`, service worker registration, and app icons.

### Step 0.4 — Configure TailwindCSS & Design System

**tailwind.config.js:**

```js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4F6AF0', dark: '#3B4FBF' },
        accent:  { DEFAULT: '#6EC6CA' },
        surface: { light: '#F4F6FB', dark: '#12151F' },
        'text-primary':   { light: '#1A1D2E', dark: '#E8ECF4' },
        'text-secondary': { light: '#5A6072', dark: '#8A94B0' },
        success: '#34C784',
        warning: '#F5A623',
        danger:  '#E8445A',
      },
      fontFamily: { sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'] },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #EEF1FB 0%, #F4F6FF 100%)',
        'gradient-dark':  'linear-gradient(135deg, #12151F 0%, #1A2035 100%)',
      },
      animation: {
        'fade-in':   'fadeIn 0.2s ease-in-out',
        'slide-up':  'slideUp 0.2s ease-out',
        'pulse-rec': 'pulseSoft 1.5s infinite',
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
```

**styles.scss:** Add at top:

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'animate.css/animate.min.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

/* ── Centralized CSS token system ─────────────────────────── */
:root {
  --color-primary:        #4F6AF0;
  --color-primary-dark:   #3B4FBF;
  --color-accent:         #6EC6CA;
  --color-surface:        #F4F6FB;
  --color-glass-bg:       rgba(255, 255, 255, 0.55);
  --color-glass-border:   rgba(79, 106, 240, 0.18);
  --color-text-primary:   #1A1D2E;
  --color-text-secondary: #5A6072;
  --color-success:        #34C784;
  --color-warning:        #F5A623;
  --color-danger:         #E8445A;
  --gradient-bg: linear-gradient(135deg, #EEF1FB 0%, #F4F6FF 100%);
}
.dark {
  --color-surface:        #12151F;
  --color-glass-bg:       rgba(18, 21, 31, 0.55);
  --color-glass-border:   rgba(110, 198, 202, 0.15);
  --color-text-primary:   #E8ECF4;
  --color-text-secondary: #8A94B0;
  --gradient-bg: linear-gradient(135deg, #12151F 0%, #1A2035 100%);
}

/* ── Glassmorphism utility ────────────────────────────────── */
.glass-card {
  background: var(--color-glass-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid var(--color-glass-border);
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
```

> **Rule:** No component may use hardcoded color hex values. All colors must reference a `--color-*` CSS token or a Tailwind token defined above.

### Step 0.5 — Configure PWA Manifest

Update `manifest.webmanifest`:

```json
{
  "name": "Callix",
  "short_name": "Callix",
  "description": "P2P meetings and chat — no servers, no limits",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e1e2e",
  "theme_color": "#6366f1",
  "orientation": "any",
  "icons": [
    { "src": "assets/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "assets/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "assets/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "assets/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "assets/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "assets/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

---

## Phase 1: Core Services & Models

### Step 1.1 — Project Structure

Create the following folder structure under `src/app/`:

```
src/app/
├── core/
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── room.model.ts
│   │   ├── message.model.ts
│   │   ├── shared-file.model.ts
│   │   ├── join-request.model.ts
│   │   ├── peer-message.model.ts
│   │   └── media-playback.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── peer.service.ts
│   │   ├── room.service.ts
│   │   ├── encryption.service.ts
│   │   ├── file-transfer.service.ts
│   │   ├── media-sync.service.ts
│   │   ├── recording.service.ts
│   │   ├── theme.service.ts
│   │   └── alert.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── interceptors/
├── shared/
│   ├── components/
│   │   ├── theme-toggle/
│   │   ├── emoji-picker/
│   │   ├── file-upload/
│   │   ├── qr-code-modal/
│   │   ├── participant-card/
│   │   ├── chat-panel/
│   │   └── navbar/
│   ├── directives/
│   │   └── animate-on-enter.directive.ts
│   └── pipes/
│       ├── file-size.pipe.ts
│       └── time-ago.pipe.ts
├── features/
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.scss
│   ├── meeting-room/
│   │   ├── meeting-room.component.ts
│   │   ├── meeting-room.component.html
│   │   ├── meeting-room.component.scss
│   │   ├── components/
│   │   │   ├── video-grid/
│   │   │   ├── big-screen/
│   │   │   ├── controls-toolbar/
│   │   │   ├── participant-carousel/
│   │   │   ├── join-requests-panel/
│   │   │   ├── ban-list-panel/
│   │   │   └── media-player/
│   │   └── meeting-room.routes.ts
│   ├── chat-room/
│   │   ├── chat-room.component.ts
│   │   ├── chat-room.component.html
│   │   ├── chat-room.component.scss
│   │   ├── components/
│   │   │   ├── chat-messages/
│   │   │   ├── participant-sidebar/
│   │   │   ├── join-requests-panel/
│   │   │   └── ban-list-panel/
│   │   └── chat-room.routes.ts
│   ├── auth/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.scss
│   └── create-room/
│       ├── create-room.component.ts
│       ├── create-room.component.html
│       └── create-room.component.scss
├── app.component.ts
├── app.component.html
├── app.routes.ts
└── app.config.ts
```

### Step 1.2 — Data Models

**user.model.ts:**

```typescript
export interface User {
  id: string;          // GUID
  displayName: string;
  peerId: string;      // PeerJS peer ID
  avatar?: string;
}
```

**room.model.ts:**

```typescript
export type RoomType = 'meeting' | 'chat';
export type EncryptionAlgorithm = 'AES-GCM-256' | 'AES-CBC-256' | 'ChaCha20-Poly1305';

export interface Room {
  id: string;
  type: RoomType;
  hostId: string;
  encryptionAlgorithm: EncryptionAlgorithm;
  participants: Map<string, User>;
  banList: Set<string>;
  pendingRequests: Map<string, JoinRequest>;
  messages: Message[];
  sharedFiles: SharedFile[];
  mediaPlayback?: MediaPlayback;
  createdAt: number;
}
```

**message.model.ts:**

```typescript
export type MessageType = 'text' | 'file' | 'system';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: MessageType;
}
```

**peer-message.model.ts:**

```typescript
export type PeerMessageType =
  | 'chat' | 'file-meta' | 'file-chunk' | 'file-complete'
  | 'join-request' | 'join-response'
  | 'kick' | 'ban' | 'unban'
  | 'room-destroyed' | 'participant-update'
  | 'media-sync' | 'screen-share-start' | 'screen-share-stop'
  | 'active-speaker' | 'system';

export interface PeerMessage {
  type: PeerMessageType;
  payload: any;
  timestamp: number;
  senderId: string;
  encrypted: boolean;
}
```

### Step 1.3 — Core Services

#### auth.service.ts

- `generateUserId()`: Creates a GUID via `uuid.v4()`, stores in localStorage
- `getCurrentUser()`: Returns user from localStorage or null
- `setDisplayName(name: string)`: Saves display name
- `logout()`: Clears localStorage user data
- On social login/signup button click, generate new GUID

#### peer.service.ts (MOST CRITICAL SERVICE)

- `initializePeer()`: Creates PeerJS `Peer` instance with the user's GUID
- `connectToPeer(peerId: string)`: Opens a DataConnection
- `onIncomingConnection()`: Observable for incoming peer connections
- `sendMessage(peerId: string, message: PeerMessage)`: Sends encrypted message via DataChannel
- `broadcastMessage(message: PeerMessage)`: Sends to all connected peers
- `onMessage()`: Observable for incoming messages (decrypted)
- `callPeer(peerId: string, stream: MediaStream)`: Initiates media call
- `onIncomingCall()`: Observable for incoming media calls
- `destroy()`: Cleans up all connections
- Maintains a `Map<string, DataConnection>` for all active connections
- Maintains a `Map<string, MediaConnection>` for all media connections

#### room.service.ts

- `createRoom(type: RoomType, algorithm: EncryptionAlgorithm)`: Creates room, generates GUID
- `joinRoom(roomId: string)`: Sends join request to host
- `leaveRoom()`: Disconnects; if host, destroys room
- `approveRequest(userId: string)`: Approves join request
- `denyRequest(userId: string)`: Denies join request
- `approveAll()`: Batch approve
- `denyAll()`: Batch deny
- `kickParticipant(userId: string)`: Kicks and auto-bans
- `banUser(userId: string)`: Adds to ban list
- `unbanUser(userId: string)`: Removes from ban list
- `unbanAll()`: Clears ban list
- `getBanList()`: Returns current ban list
- `getPendingRequests()`: Returns pending requests
- `getParticipants()`: Returns current participants
- Emits room state changes via BehaviorSubjects

#### encryption.service.ts

- `generateKeyPair()`: ECDH key pair via Web Crypto API
- `deriveSharedSecret(publicKey, privateKey)`: ECDH shared secret
- `generateRoomKey(algorithm)`: Random symmetric key
- `encrypt(data, key, algorithm)`: Encrypts data
- `decrypt(data, key, algorithm)`: Decrypts data
- `exportKey(key)`: Exports CryptoKey for transfer
- `importKey(data, algorithm)`: Imports key from raw data
- For ChaCha20-Poly1305: use tweetnacl.js `secretbox`

#### file-transfer.service.ts

- `sendFile(file: File, peers: string[])`: Chunks and sends file
- `onFileReceived()`: Observable for complete received files
- `onProgress()`: Observable for transfer progress
- `CHUNK_SIZE = 16384` (16KB)
- `LARGE_FILE_THRESHOLD = 52428800` (50MB)
- Shows SweetAlert warning for large files before sending

#### media-sync.service.ts

- `startMediaPlayback(url: string)`: Host starts synced media
- `syncPlayback(action, currentTime)`: Broadcasts play/pause/seek
- `onMediaCommand()`: Observable for incoming media commands
- `stopMediaPlayback()`: Host stops media, unlocks big-screen
- Sync tolerance: 500ms

#### recording.service.ts

- `startRecording(stream: MediaStream)`: Starts MediaRecorder
- `stopRecording()`: Stops and returns Blob
- `downloadRecording(blob: Blob, filename: string)`: Triggers download
- `isRecording$`: Observable for recording state

#### theme.service.ts

- `setTheme(mode: 'light' | 'dark' | 'system')`: Applies theme
- `getCurrentTheme()`: Returns current theme
- `theme$`: Observable for theme changes
- Adds/removes `dark` class on `<html>` element
- Listens to `prefers-color-scheme` media query for system mode
- Persists preference in localStorage

#### alert.service.ts

- Wraps SweetAlert2 for consistent usage
- `showSuccess(title, text)`, `showError(title, text)`
- `showConfirm(title, text)`: Returns promise with user choice
- `showKicked(message)`: Styled alert for kicked users
- `showRoomDestroyed()`: Alert when host leaves
- `showLargeFileWarning(fileName, fileSize)`: Proceed/cancel dialog

---

## Phase 2: Authentication & Home Screen

### Step 2.1 — Login Page (`features/auth/`)

- Full-screen page background using `var(--gradient-bg)`
- Centered `.glass-card` with app logo, tagline, and auth buttons
- "Sign in with Google" button (placeholder — generates GUID)
- "Sign Up" button (placeholder — generates GUID)
- Display name input field (required before proceeding)
- animate.css `animate__fadeInUp` (200ms) on card entrance
- After login, redirect to `/home`
- **Design tone:** Clean, confident, minimal — no decorative shapes or loud gradients

### Step 2.2 — Home Page (`features/home/`)

The Home Page is the **main hub** after login. It is split into distinct zones:

**Top Navbar:**
- App logo (left), user display name, theme toggle, logout button
- Glass surface style (`glass-card` for the nav bar)

**Start Meeting Section:**
- Prominent "Start Meeting" CTA button (primary color)
- Opens the Create Meeting modal/flow → on creation, navigates to `/meeting/:roomId`

**Join a Room Section:**
- GUID text input + "Scan QR" icon button + "Join" button
- Joining a meeting GUID navigates to `/meeting/:roomId`

**My Chat Rooms Section:**
- Header: "Chat Rooms" with a "+ New Chat Room" button
- Active chat rooms rendered as `.glass-card` tiles showing: room name, last message preview, participant count, host badge (if host), leave/close button
- Chat interactions happen **inline within the card** or in an expanded panel — no route navigation
- Empty state message when no chat rooms are active

### Step 2.3 — Create Meeting Modal/Page (`features/create-room/`)

- Triggered from "Start Meeting" on Home Page
- Room type is fixed to `meeting`
- Display name input (pre-filled from auth)
- Encryption algorithm dropdown: AES-GCM-256, AES-CBC-256, ChaCha20-Poly1305
- "Create & Join" button — on click:
  1. Generates room GUID via `uuid.v4()`
  2. Calls `room.service.ts → createRoom()` → host is **automatically added as the first participant**
  3. Navigates to `/meeting/:roomId`
  - **No intermediate "share GUID then enter" step** — host lands directly in the room

### Step 2.4 — Create Chat Room Flow (on Home Page)

- Triggered from "+ New Chat Room" on Home Page
- Opens a compact inline modal (`.glass-card`, `animate__zoomIn`)
- Fields: Room name, encryption algorithm dropdown
- "Create & Join" button — on click:
  1. Generates room GUID
  2. Host is **automatically added as the first participant**
  3. New chat room card appears in the "My Chat Rooms" section
  - **No route navigation** — stays on Home Page

---

## Phase 3: Meeting Room

### Step 3.1 — Meeting Room Layout (`features/meeting-room/`)

- Full-screen layout divided into:
  - **Big Screen Area** (70-80% width): Shows active speaker / shared screen / pinned user / synced media
  - **Participant Carousel** (below big screen): Owl Carousel showing participant video thumbnails
  - **Chat Sidebar** (right, collapsible): Chat messages + emoji picker + file sharing
  - **Controls Toolbar** (bottom, glass surface): Mic, Camera, Screen Share, Record, Chat toggle, Participants, **Room Info**, Leave

- On route entry, `room.service.ts` checks if the user is the host. If yes, host is already a participant (added at creation). If a guest, display "Syncing…" indicator until history sync completes (see Step 3.10).

### Step 3.2 — Big Screen Component (`components/big-screen/`)

- Priority order: (1) Synced media playback, (2) Screen share, (3) Pinned user, (4) Active speaker
- Smooth transition animation when switching views
- Full-screen toggle button
- "Unpin" button when a user is pinned

### Step 3.3 — Participant Carousel (`components/participant-carousel/`)

- Uses ngx-owl-carousel-o
- Each item shows: video feed, display name overlay, mic status icon
- Click to pin a participant
- Responsive: shows fewer items on mobile
- animate.css `fadeIn` when new participant joins, `fadeOut` when they leave

### Step 3.4 — Controls Toolbar (`components/controls-toolbar/`)

- Glass surface style (`glass-card` applied to the toolbar container)
- Lucide icons for each control; icon color uses `--color-text-secondary`, active state uses `--color-primary`
- Toggle buttons for: Mic (mute/unmute), Camera (on/off), Screen Share (start/stop)
- Record button with recording indicator (red dot pulse, `--color-danger`)
- Chat toggle button with unread message badge (`--color-accent`)
- Participants list button (shows count)
- Media URL button (host only) — opens modal to paste URL
- **Room Info button** — opens `RoomInfoModalComponent` showing: room GUID, copy-to-clipboard button, QR code (`angularx-qrcode`), download QR button
- Leave button (`--color-danger`, prominent)
- Responsive: collapses into a "more" menu on mobile

### Step 3.5 — Join Requests Panel (`components/join-requests-panel/`)

- Slide-in panel or modal
- List of pending requests with: user name, timestamp
- Per-request: Approve / Deny buttons
- Batch actions: Approve All / Deny All
- animate.css `slideInRight` on open
- Badge on the toolbar showing pending count

### Step 3.6 — Ban List Panel (`components/ban-list-panel/`)

- Modal with list of banned users
- Per-user: Unban button
- Unban All button at top
- Empty state message when ban list is empty

### Step 3.7 — Media Player (`components/media-player/`)

- Host-only: Input field for media URL + Load button
- Video/audio player element
- Sync controls overlay (host): play, pause, seek
- All participants see the same playback synced via P2P
- Lock indicator shown to all users when media is active

### Step 3.8 — Chat Panel (shared component)

- Message list with sender name, timestamp, content
- Auto-scroll to latest message
- Text input with send button
- Emoji picker toggle (ngx-emoji-mart)
- File attach button — opens file picker
- File messages show: filename, size, download button
- Distinct styling for system messages (join/leave/kick notifications)

### Step 3.9 — Active Speaker Detection

- Use `AudioContext` and `AnalyserNode` on each participant's audio stream
- Calculate RMS volume at intervals (~200ms)
- The peer with the highest volume above a threshold becomes the active speaker
- Debounce speaker changes (hold for at least 2 seconds before switching)
- Broadcast active speaker ID to all peers

---

## Phase 3.10 — Guest History Sync on Join

When a guest is approved to join a room:

1. Host sends a `history-sync` PeerMessage to the new peer:
   ```json
   {
     "type": "history-sync",
     "payload": {
       "messages": [...],
       "files": [{ "id", "name", "size", "mimeType", "senderId", "timestamp" }],
       "participants": [...]
     }
   }
   ```
2. New peer shows a `"Syncing room history…"` overlay with a spinner until the sync payload is fully received.
3. For each file in the history, the new peer may request the raw file data from the peer that originally shared it (via `file-request` message). The original sender streams it back in chunks.
4. Once sync is complete, the overlay is dismissed and the peer is shown the room.
5. **All sync messages are encrypted** with the room key (received during ECDH key exchange at join time).

---

## Phase 4: Chat Room (Embedded in Home Page)

### Step 4.1 — Chat Room Architecture

- Chat rooms **do not have their own route**. They are rendered as expanded `.glass-card` panels within the Home Page's "My Chat Rooms" section.
- The `ChatRoomComponent` is a standalone component embedded directly inside the Home Page's template.
- State is managed via `room.service.ts` — each active chat room is a separate `Room` object in the service.
- The host is auto-joined on creation (no separate join step).

### Step 4.2 — Chat Room Card Layout

- Each room card (`.glass-card`) shows:
  - **Header**: Room name, participant count, GUID display (truncated + copy icon), host badge, expand/minimize toggle, leave/close button
  - **Body (expanded)**: Chat messages panel, file sharing, emoji picker
  - **Footer**: Message input bar
- Right-click or kebab menu (host only): View Join Requests, View Ban List
- Collapsible to a compact preview card (shows last message + participant count)

### Step 4.3 — Chat Room Specific Components

- Reuse: `chat-panel`, `join-requests-panel`, `ban-list-panel`, `file-upload`, `emoji-picker`
- Add: compact `participant-chip-list` showing avatar initials of online users
- Host controls in a dropdown (Lucide `MoreVertical` icon): View Ban List, View Join Requests

---

## Phase 5: Shared Components & Polish

### Step 5.1 — Theme Toggle (`shared/components/theme-toggle/`)

- Three-way toggle: Light / Dark / System
- Uses Lucide icons: Sun, Moon, Monitor
- Smooth CSS transition on theme change
- Toggles `dark` class on `<html>` for TailwindCSS dark mode

### Step 5.2 — QR Code Modal (`shared/components/qr-code-modal/`)

- Uses angularx-qrcode to render QR code
- Download as PNG button
- Copy GUID button
- Close button
- animate.css `zoomIn` on open, `zoomOut` on close

### Step 5.3 — File Upload Component (`shared/components/file-upload/`)

- Drag-and-drop zone + click to browse
- File preview (name, size, type icon)
- Large file detection — triggers alert.service warning
- Progress bar during transfer
- Cancel transfer button

### Step 5.4 — Navbar (`shared/components/navbar/`)

- App logo (left)
- Current user display name
- Theme toggle
- Settings icon
- Logout button

### Step 5.5 — Pipes & Directives

- `fileSizePipe`: Formats bytes to KB/MB/GB
- `timeAgoPipe`: Formats timestamps to "2 min ago" style
- `animateOnEnter` directive: Applies animate.css class when element enters viewport

---

## Phase 6: Responsive Design & Mobile Optimization

### Step 6.1 — Breakpoints

- Mobile: < 640px
- Tablet: 640px–1024px
- Desktop: > 1024px

### Step 6.2 — Meeting Room Mobile

- Big screen takes full width
- Carousel becomes horizontal scroll below video
- Chat sidebar becomes a bottom sheet (slide up)
- Controls toolbar fixed at bottom, compact icon-only mode
- Join requests as a full-screen overlay

### Step 6.3 — Chat Room Mobile

- Single column layout
- Participant sidebar becomes a slide-out drawer
- Chat input fixed at bottom

### Step 6.4 — Home Page Mobile

- Stacked cards instead of side-by-side
- Full-width action buttons

---

## Phase 7: PWA Finalization

### Step 7.1 — Service Worker Config

Update `ngsw-config.json` to cache app shell, CSS, JS, fonts, icons.

### Step 7.2 — App Icons

Generate all required icon sizes (72, 96, 128, 144, 192, 384, 512) and place in `src/assets/icons/`.

### Step 7.3 — Splash Screen

Configure splash screen colors and icon in manifest.

### Step 7.4 — Install Prompt

Create a custom "Install App" banner/button that triggers the `beforeinstallprompt` event.

---

## Phase 8: Testing & Quality

### Step 8.1 — Unit Tests

- Test all core services with Jasmine/Karma (Angular defaults)
- Mock PeerJS connections for peer.service tests
- Test encryption round-trip (encrypt then decrypt)
- Test room lifecycle (create, join, leave, destroy)
- Test file chunking and reassembly

### Step 8.2 — E2E Tests

- Use Playwright or Cypress
- Test: login flow, room creation, joining with GUID, sending messages
- Test: theme switching, QR code generation

---

## Execution Order Summary

| Phase | Name | Dependencies | Priority |
|---|---|---|---|
| 0 | Scaffolding | None | P0 — Do first |
| 1 | Core Services & Models | Phase 0 | P0 |
| 2 | Auth & Home Screen | Phase 1 | P0 |
| 3 | Meeting Room | Phase 1, 2 | P0 |
| 4 | Chat Room | Phase 1, 2, 3 (reuses components) | P1 |
| 5 | Shared Components & Polish | Phase 2, 3 | P1 |
| 6 | Responsive & Mobile | Phase 3, 4, 5 | P1 |
| 7 | PWA Finalization | Phase 0, all UI phases | P2 |
| 8 | Testing | All phases | P2 |

---

## Key Implementation Notes

1. **Use Angular Standalone Components** — No NgModules. All components should be standalone with direct imports.
2. **Use Angular Signals** where appropriate for reactive state (Angular 19+).
3. **Lazy-load routes** for `meeting-room` feature. Chat rooms are embedded components — no lazy route needed.
4. **Use `OnPush` change detection** on all components for performance.
5. **PeerJS Cloud Server** — Use the free PeerJS cloud for signaling during development. Plan for self-hosted PeerJS server in production.
6. **WebRTC TURN** — PeerJS cloud includes basic TURN. For production, consider deploying a TURN server (coturn).
7. **File Chunking** — Use 16KB chunks for DataChannel transfers. Larger chunks may exceed DataChannel buffer limits.
8. **Active Speaker** — Use Web Audio API `AnalyserNode` to detect volume levels. Do NOT rely on WebRTC `getStats()` alone as it's inconsistent across browsers.
9. **Encryption Key Exchange** — Perform ECDH key exchange immediately after PeerJS DataConnection opens, BEFORE any application data is sent.
10. **Room Destruction** — When host disconnects (intentional or accidental), all peers must handle the `room-destroyed` message AND the PeerJS `close` event as a fallback.
11. **animate.css** — Use sparingly. Max duration 250ms. Preferred classes: `animate__fadeIn`, `animate__fadeInUp`, `animate__zoomIn`. No looping animations on UI chrome.
12. **TailwindCSS Dark Mode** — Use the `class` strategy. Toggle `dark` class on `<html>`. Use `dark:` prefix for dark mode styles.
13. **SweetAlert2** — Use `Swal.fire()` with `background: var(--color-glass-bg)`, `color: var(--color-text-primary)`, and `confirmButtonColor: var(--color-primary)` to match the theme.
14. **Owl Carousel** — Import `CarouselModule` from `ngx-owl-carousel-o`. Configure responsive breakpoints for different screen sizes.
15. **QR Scanner** — Use `@zxing/ngx-scanner` for camera-based QR scanning on mobile. Falls back to manual GUID input on desktop.
16. **No Hardcoded Colors** — Every color in every component SCSS must reference a `--color-*` CSS variable or a Tailwind token from the config. Zero exceptions.
17. **Glassmorphism** — Apply the `.glass-card` utility class (defined in `styles.scss`) to all card/panel/modal/toolbar surfaces. Do not redefine glass styles per-component.
18. **Host Auto-Join** — In `room.service.ts → createRoom()`, immediately after generating the room GUID, add the current user to `room.participants` as the host before any P2P handshake. The host never sends themselves a join request.
19. **GUID in Meeting Room** — The `RoomInfoModalComponent` must be accessible from the controls toolbar at all times during an active meeting. It shows the GUID, a copy button, and a live-rendered QR code.
20. **History Sync** — The `history-sync` PeerMessage must be sent to every newly approved guest by the host, containing all current messages, file metadata, and participant list. Sync happens before the guest's UI enters the room view.

---

## Routing Configuration

```typescript
// app.routes.ts
// NOTE: Chat rooms are embedded components on the Home Page — no /chat/:roomId route.
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
  { path: 'meeting/:roomId', loadComponent: () => import('./features/meeting-room/meeting-room.component').then(m => m.MeetingRoomComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];
```

> **Removed:** `/create-room` and `/chat/:roomId` routes. Create Meeting is a modal on Home. Chat rooms are inline components on Home.

---

## Environment & Build

- **Development:** `ng serve` — runs on `localhost:4200`
- **Production build:** `ng build --configuration production`
- **PWA testing:** Must use `http-server` or similar on the production build to test service worker
- **No environment files needed** — No backend URLs, API keys, or secrets (everything is client-side)
