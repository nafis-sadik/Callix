import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'callix-user';
  
  currentUser = signal<User | null>(this.loadUser());
  
  get isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  private loadUser(): User | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  generateUserId(): string {
    return crypto.randomUUID();
  }

  setUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  updateDisplayName(displayName: string): void {
    const user = this.currentUser();
    if (user) {
      user.displayName = displayName;
      this.setUser(user);
    }
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
  }
}
