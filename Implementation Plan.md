# Callix — Implementation Plan

## Overview
This document outlines the phased plan to resolve known bugs, close feature gaps, and improve quality across the Callix PWA. Each phase is ordered by impact and dependency.

---

## Phase 0: Critical Bug Fixes (Immediate)

| # | Task | Effort | Area | Dependencies |
|---|------|--------|------|-------------|
| 0.1 | **Fix E2E encryption** — make `createPeerMessage()` dynamically set `encrypted: true` when the room has encryption enabled and key exchange is complete. Also update manual PeerMessage constructions in `meeting-room.ts`, `file-transfer.service.ts`, `media-sync.service.ts` to respect encryption. | 2-3h | `room.service.ts`, `peer.service.ts`, all message senders | None |
| 0.2 | **Broadcast `participant-update` on new join** — add a `broadcastMessage('participant-update', ...)` call in `approveRequest()` after local state is updated, so existing guests see new participants appear. | 30min | `room.service.ts` | None |
| 0.3 | **Fix `approveAll()`** — ensure it broadcasts `participant-update` after all requests are approved (it loops `approveRequest()`, which after fix 0.2 will handle each approval individually). | 15min | `room.service.ts` | 0.2 |

**Verification for Phase 0:**
- Create a room with encryption enabled → verify all DataChannel messages are sent with `encrypted: true` (via dev tools or logging)
- Join a room as Guest A → verify Guest B (already in room) sees Guest A appear in participants panel
- Verify kicked modal does not appear when guest willingly leaves (confirmed fixed in b82cefb)

---

## Phase 1: Feature Gaps (Short-term)

| # | Task | Effort | Area | Dependencies |
|---|------|--------|------|-------------|
| 1.1 | **Add "Syncing..." indicator** — show a loading state in the guest UI while `sendHistorySync()` is in progress, before the room content is revealed. | 1-2h | `room.service.ts`, meeting-room component | None |
| 1.2 | **Implement active speaker detection** — replace the stub with proper `RTCRtpReceiver` audio level analysis or a simple volume-based detection using `AnalyserNode` from Web Audio API. | 3-4h | MeetingRoomComponent, new audio-analysis service | None |
| 1.3 | **Add emoji keyboard** to chat panel — integrate a lightweight emoji picker (or build a simple one). | 2-3h | ChatPanelComponent | None |
| 1.4 | **Manual ban UI** — add a "Ban" button (separate from Kick) in the participants panel, and/or in the banned tab. | 1h | ParticipantsPanelComponent, `room.service.ts` | None |

---

## Phase 2: Maintenance & Quality (Medium-term)

| # | Task | Effort | Area | Dependencies |
|---|------|--------|------|-------------|
| 2.1 | **Clean up dead code** — remove the unused `'ban'`/`'unban'` message handlers, and the `addToBanList()`/`removeFromBanList()` methods that are only reachable via those dead handlers. | 30min | `room.service.ts` | None |
| 2.2 | **Add `isHost()` guard to `banUser()`** — for consistency with `unbanUser()`/`unbanAll()`, add a host-only guard to prevent unauthorized local state mutations. | 15min | `room.service.ts` | None |
| 2.3 | **Write unit tests** — add vitest tests for core services:
  - `EncryptionService` (key gen, encrypt/decrypt, key exchange)
  - `RoomService` (room creation, join flow, kick flow, participant sync)
  - `PeerService` (message send/receive, encryption integration)
  - `AuthService` (user persistence, authentication state)
  - `FileTransferService` (chunking, reassembly, progress)
  - `AlertService` (modal and toast invocation)
  - `LoggerService` (structured logging)
  - `RecordingService` (MediaRecorder lifecycle)
  - `MediaSyncService` (playback command propagation)
  - `ThemeService` (mode switching, persistence)

  | 4-6h | All services | Phase 0 (for encryption tests) |
| 2.4 | **Fix algorithm selection** — make `encrypt()`/`decrypt()` respect the room's selected algorithm, or remove the non-AES-GCM options from the UI if they won't be supported. | 1-2h | `encryption.service.ts`, home component | None |

---

## Phase 3: PWA & Polish (Long-term)

| # | Task | Effort | Area | Dependencies |
|---|------|--------|------|-------------|
| 3.1 | **Configure service worker** — add `ngsw-config.json` for offline app shell caching and asset caching. | 2-3h | PWA configuration | None |
| 3.2 | **Add splash screen** — configure the PWA manifest with `description`, `orientation`, and themed splash screen parameters. | 30min | `manifest.webmanifest` | None |
| 3.3 | **Responsive polish** — audit all screens at 320px, 768px, 1024px, and 4K breakpoints; fix layout issues in meeting room toolbar, participants panel, and carousel. | 3-4h | All components | None |
| 3.4 | **Add toast notifications for key events** — show toasts when users join/leave the room, when files are received, etc. | 1-2h | `room.service.ts`, `alert.service.ts` | None |
| 3.5 | **Improve error handling for PeerJS signaling failures** — detect when PeerJS cloud is unreachable and show a meaningful error, possibly with a retry option. | 2-3h | `peer.service.ts` | None |

---

## Effort Summary

| Phase | Tasks | Est. Effort | Priority |
|-------|-------|-------------|----------|
| Phase 0 — Critical Bug Fixes | 3 | 3-4h | 🔴 Immediate |
| Phase 1 — Feature Gaps | 4 | 7-10h | 🟡 Short-term |
| Phase 2 — Maintenance & Quality | 4 | 5-9h | 🟡 Medium-term |
| Phase 3 — PWA & Polish | 5 | 8-12h | 🟢 Long-term |
| **Total** | **16** | **23-35h** | |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Encryption fix breaks existing message flow | Low | High | Test with all 22 message types; keep `encrypted: false` as default fallback when no key exists |
| Mesh topology degrades with >10 participants | Medium | Medium | Acceptable for v1; document as a known limitation; consider SFU in future |
| PeerJS cloud outage | Low | High | Document as dependency; consider self-hosted PeerJS server |
| Browser API inconsistencies (screen share, recording) | Medium | Low | Already handled — feature detection in place |
| Large file transfers impact UX | Medium | Low | 50MB warning + progress bar already implemented |

---

## Definition of Done

A task is considered complete when:
1. Code change is implemented and committed
2. The specific feature/bug is verified manually in the browser
3. Relevant unit tests pass (where tests exist; see Phase 2.3)
4. No new console errors or TypeScript compilation errors
5. Lint checks pass (`prettier --check`)

---

## Architecture Decision Records

### ADR-1: Encryption Flag Fix
**Date:** 2026-05-15  
**Decision:** `createPeerMessage()` will check `room.encryptionAlgorithm !== 'none' && encryptionService.hasRoomKey()` before setting `encrypted: true`.  
**Rationale:** Avoids encrypting messages before key exchange completes and does not encrypt key-exchange messages themselves (chicken-and-egg problem).

### ADR-2: Participant Broadcast on Approve
**Date:** 2026-05-15  
**Decision:** `approveRequest()` will broadcast `participant-update` after adding the new participant.  
**Rationale:** The pattern is already established in `completeKick()`; this is the mirror case. Using `broadcastMessage` ensures all existing guests receive the update via their existing `handleParticipantUpdate()` handler.

### ADR-3: Test Framework
**Decision:** Use `vitest` (already configured in `package.json`). Tests live as `.spec.ts` files co-located with their source files or in a dedicated `__tests__/` directory following Angular conventions.
