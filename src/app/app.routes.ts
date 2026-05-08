import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent), canActivate: [authGuard] },
  { path: 'meeting/:roomId', loadComponent: () => import('./features/meeting-room/meeting-room/meeting-room').then(m => m.MeetingRoomComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];
