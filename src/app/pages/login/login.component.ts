import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  errorMessage = signal('');
  isSignUp = signal(false);

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  toggleMode() {
    this.isSignUp.update(v => !v);
    this.errorMessage.set('');
  }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please fill in all fields.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      if (this.isSignUp()) {
        await this.supabase.signUp(this.email, this.password);
      }
      await this.supabase.signIn(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      this.errorMessage.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
