import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastModule, ConfirmDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-toast></p-toast>
    <p-confirmdialog></p-confirmdialog>
    @if (navbarVisible()) {
      <app-navbar></app-navbar>
    }
    <main [class.min-h-screen]="navbarVisible()" [class.h-screen]="!navbarVisible()" class="bg-[var(--gradient-bg)]">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private sub: Subscription | null = null;
  navbarVisible = signal(true);

  ngOnInit(): void {
    this.updateNavbar();
    this.sub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.updateNavbar());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private updateNavbar(): void {
    this.navbarVisible.set(!this.router.url.startsWith('/meeting'));
  }
}
