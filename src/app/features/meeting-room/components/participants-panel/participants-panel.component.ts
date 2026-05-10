import { Component, Input, Output, EventEmitter, signal, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class ParticipantsPanelComponent {
  @Input() show = false;
  @Input() participants: User[] = [];
  @Input() requests: JoinRequest[] = [];
  @Input() banList: string[] = [];
  @Input() isHost = false;
  @Input() currentUserId = '';
  @Output() kick = new EventEmitter<string>();
  @Output() approve = new EventEmitter<string>();
  @Output() deny = new EventEmitter<string>();
  @Output() approveAll = new EventEmitter<void>();
  @Output() denyAll = new EventEmitter<void>();
  @Output() unban = new EventEmitter<string>();
  @Output() unbanAll = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  activeTab = signal<string | number>(0);
  searchQuery = signal('');

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close.emit();
      this.searchQuery.set('');
    }
  }

  getFilteredParticipants(): User[] {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.participants;
    return this.participants.filter(p => p.displayName.toLowerCase().includes(q));
  }

  getFilteredRequests(): JoinRequest[] {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.requests;
    return this.requests.filter(r => r.displayName.toLowerCase().includes(q));
  }

  getFilteredBanList(): string[] {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.banList;
    return this.banList.filter(id => id.toLowerCase().includes(q));
  }

  onKick(userId: string): void {
    this.kick.emit(userId);
  }

  onApprove(userId: string): void {
    this.approve.emit(userId);
  }

  onDeny(userId: string): void {
    this.deny.emit(userId);
  }

  onApproveAll(): void {
    this.approveAll.emit();
  }

  onDenyAll(): void {
    this.denyAll.emit();
  }

  onUnban(userId: string): void {
    this.unban.emit(userId);
  }

  onUnbanAll(): void {
    this.unbanAll.emit();
  }
}
