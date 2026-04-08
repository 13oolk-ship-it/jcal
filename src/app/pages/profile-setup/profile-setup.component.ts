import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ImageCropperComponent,
  ],
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.css',
})
export class ProfileSetupComponent implements OnInit {
  step = signal(1);
  saving = signal(false);
  loading = signal(true);
  errorMessage = signal('');
  avatarUrl = signal<string | null>(null);
  uploadingAvatar = signal(false);
  showCropper = signal(false);
  imageChangedEvent: Event | null = null;
  croppedBlob: Blob | null = null;

  weight: number | null = null;
  height: number | null = null;
  age: number | null = null;
  gender = '';
  goalType = '';
  activityLevel = '';

  genderOptions = [
    { value: 'male', label: 'Male', icon: 'male' },
    { value: 'female', label: 'Female', icon: 'female' },
  ];

  goalOptions = [
    { value: 'lose', label: 'Lose Weight', icon: 'trending_down', desc: 'Calorie deficit' },
    { value: 'maintain', label: 'Maintain', icon: 'balance', desc: 'Keep current weight' },
    { value: 'gain', label: 'Gain Weight', icon: 'trending_up', desc: 'Calorie surplus' },
  ];

  activityOptions = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Lightly Active', desc: 'Exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', desc: 'Exercise 3-5 days/week' },
    { value: 'active', label: 'Very Active', desc: 'Exercise 6-7 days/week' },
  ];

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toast: ToastService,
  ) {}

  async ngOnInit() {
    try {
      const profile = await this.supabase.getProfile();
      if (profile) {
        this.weight = profile.weight ?? null;
        this.height = profile.height ?? null;
        this.age = profile.age ?? null;
        this.gender = profile.gender ?? '';
        this.goalType = profile.goal_type ?? '';
        this.activityLevel = profile.activity_level ?? '';
        this.avatarUrl.set(profile.avatar_url ?? null);
      }
    } catch {
      // Profile doesn't exist yet — that's fine
    } finally {
      this.loading.set(false);
    }
  }

  canProceed(): boolean {
    const s = this.step();
    if (s === 1) return !!this.weight && !!this.height && !!this.age && !!this.gender;
    if (s === 2) return !!this.goalType;
    if (s === 3) return !!this.activityLevel;
    return false;
  }

  next() {
    if (this.canProceed() && this.step() < 3) {
      this.step.update(s => s + 1);
    }
  }

  back() {
    if (this.step() > 1) {
      this.step.update(s => s - 1);
    }
  }

  async save() {
    if (!this.canProceed()) return;
    this.saving.set(true);
    this.errorMessage.set('');
    try {
      await this.supabase.upsertProfile({
        weight: this.weight!,
        height: this.height!,
        age: this.age!,
        gender: this.gender,
        goal_type: this.goalType,
        activity_level: this.activityLevel,
      });
      this.toast.success('Profile saved! 🎉');
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      this.saving.set(false);
    }
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage.set('Image must be under 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.errorMessage.set('Please select an image file');
      return;
    }
    this.errorMessage.set('');
    this.imageChangedEvent = event;
    this.showCropper.set(true);
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedBlob = event.blob ?? null;
  }

  cancelCrop() {
    this.showCropper.set(false);
    this.imageChangedEvent = null;
    this.croppedBlob = null;
  }

  async confirmCrop() {
    if (!this.croppedBlob) return;
    this.showCropper.set(false);
    this.uploadingAvatar.set(true);
    this.errorMessage.set('');
    try {
      const file = new File([this.croppedBlob], 'avatar.png', { type: 'image/png' });
      const url = await this.supabase.uploadAvatar(file);
      this.avatarUrl.set(url);
    } catch (err: unknown) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Failed to upload avatar');
    } finally {
      this.uploadingAvatar.set(false);
      this.imageChangedEvent = null;
      this.croppedBlob = null;
    }
  }
}
