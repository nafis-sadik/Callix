import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, FloatLabelModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  displayName = '';
  isLoading = false;

  login(): void {
    if (!this.displayName.trim()) {
      this.alertService.showError('Error', 'Please enter a display name');
      return;
    }

    this.isLoading = true;
    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      displayName: this.displayName.trim(),
      peerId: userId
    };

    this.authService.setUser(user);
    this.isLoading = false;
    this.router.navigate(['/home']);
  }
}
