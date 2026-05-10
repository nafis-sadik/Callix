import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  template: `
    <p-toast></p-toast>
    <p-confirmdialog></p-confirmdialog>
    @if (showNavbar()) {
      <app-navbar></app-navbar>
    }
    <main [class.min-h-screen]="showNavbar()" [class.h-screen]="!showNavbar()" class="bg-[var(--gradient-bg)]">
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

  showNavbar(): boolean {
    return this.navbarVisible();
  }
}
