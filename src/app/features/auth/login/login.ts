import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  displayName = '';
  isLoading = false;

  loginWithGoogle(): void {
    if (!this.displayName.trim()) {
      this.alertService.showError('Error', 'Please enter a display name');
      return;
    }
    
    this.isLoading = true;
    const userId = this.authService.generateUserId();
    const user = {
      id: userId,
      displayName: this.displayName.trim(),
      peerId: userId
    };
    
    this.authService.setUser(user);
    this.isLoading = false;
    this.router.navigate(['/home']);
  }

  signUp(): void {
    this.loginWithGoogle(); // Same flow for demo
  }
}
