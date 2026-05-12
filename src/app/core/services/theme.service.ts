import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark' | 'system'>('system');
  private prefersDarkMql = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.loadTheme();
    const onChange = () => { if (this.theme() === 'system') this.applyTheme(); };
    this.prefersDarkMql.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => this.prefersDarkMql.removeEventListener('change', onChange));
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.theme.set(theme);
    localStorage.setItem('callix-theme', theme);
    this.applyTheme();
  }

  private loadTheme(): void {
    const saved = localStorage.getItem('callix-theme') as 'light' | 'dark' | 'system';
    if (saved) {
      this.theme.set(saved);
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    const isDark = this.theme() === 'dark' || (this.theme() === 'system' && this.prefersDarkMql.matches);
    document.documentElement.classList.toggle('dark', isDark);
  }

  isDark(): boolean {
    return this.theme() === 'dark' || (this.theme() === 'system' && this.prefersDarkMql.matches);
  }
}
