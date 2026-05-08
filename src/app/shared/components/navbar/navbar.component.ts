import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, TooltipDirective],
  template: `
    <nav class="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/home" class="text-2xl font-bold" style="color: var(--color-primary);">
            Callix
          </a>

          <!-- Right side -->
          <div class="flex items-center gap-4">
            <!-- User Name -->
            <span class="text-sm font-medium hidden sm:block" style="color: var(--color-text-primary);">
              {{ authService.currentUser()?.displayName || 'User' }}
            </span>

            <!-- Theme Toggle -->
            <app-theme-toggle></app-theme-toggle>

            <!-- Logout -->
            <button
              (click)="logout()"
              class="px-4 py-2 text-sm rounded-lg transition-all hover:opacity-90"
              style="color: var(--color-danger); background: transparent; border: 1px solid var(--color-danger);"
              [appTooltip]="'Sign out'">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
