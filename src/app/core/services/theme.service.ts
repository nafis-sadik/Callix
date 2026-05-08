import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark' | 'system'>('system');

  constructor() {
    this.loadTheme();
    this.setupSystemThemeListener();
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
    const theme = this.theme();
    const html = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('dark', prefersDark);
    } else {
      html.classList.toggle('dark', theme === 'dark');
    }
  }

  private setupSystemThemeListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.theme() === 'system') {
        this.applyTheme();
      }
    });
  }

  getCurrentTheme(): 'light' | 'dark' | 'system' {
    return this.theme();
  }

  isDark(): boolean {
    const theme = this.theme();
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  }
}
