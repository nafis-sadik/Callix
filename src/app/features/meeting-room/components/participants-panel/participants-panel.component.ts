import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { User, JoinRequest } from '../../../../core/models/room.model';

@Component({
  selector: 'app-participants-panel',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DrawerModule, ButtonModule, AvatarModule, TagModule,
    TabsModule, InputTextModule, IconFieldModule, InputIconModule, TimeAgoPipe
  ],
  templateUrl: './participants-panel.component.html',
  styleUrl: './participants-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantsPanelComponent {
  @Input() show = false;
  @Input() set participants(v: User[]) { this.#participantsSig.set(v); }
  @Input() set requests(v: JoinRequest[]) { this.#requestsSig.set(v); }
  @Input() set banList(v: string[]) { this.#banListSig.set(v); }
  @Input() isHost = false;
  @Input() currentUserId = '';
  @Input() pendingKicks: string[] = [];
  @Output() kick = new EventEmitter<string>();
  @Output() approve = new EventEmitter<string>();
  @Output() deny = new EventEmitter<string>();
  @Output() approveAll = new EventEmitter<void>();
  @Output() denyAll = new EventEmitter<void>();
  @Output() unban = new EventEmitter<string>();
  @Output() unbanAll = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  readonly #participantsSig = signal<User[]>([]);
  readonly #requestsSig = signal<JoinRequest[]>([]);
  readonly #banListSig = signal<string[]>([]);
  searchQuery = signal('');

  protected readonly filteredParticipants = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const items = this.#participantsSig();
    return !q ? items : items.filter(p => p.displayName.toLowerCase().includes(q));
  });

  protected readonly filteredRequests = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const items = this.#requestsSig();
    return !q ? items : items.filter(r => r.displayName.toLowerCase().includes(q));
  });

  protected readonly filteredBanList = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const items = this.#banListSig();
    return !q ? items : items.filter(id => id.toLowerCase().includes(q));
  });

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close.emit();
      this.searchQuery.set('');
    }
  }
}
