import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a routerLink="/home" class="text-2xl font-bold" style="color: var(--color-primary);">
            Callix
          </a>
          <div class="flex items-center gap-4">
            <span class="text-sm font-medium hidden sm:block" style="color: var(--color-text-primary);">
              {{ displayName() }}
            </span>
            <app-theme-toggle></app-theme-toggle>
            <button
              (click)="logout()"
              class="px-4 py-2 text-sm rounded-lg transition-all hover:opacity-90"
              style="color: var(--color-danger); background: transparent; border: 1px solid var(--color-danger);"
              pTooltip="Sign out">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected displayName = computed(() => this.authService.currentUser()?.displayName || 'User');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
