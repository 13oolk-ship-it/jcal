import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService } from '../../services/supabase.service';
import { PushNotificationService } from '../../services/push-notification.service';
import { ToastService } from '../../services/toast.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './notification-settings.component.html',
  styleUrl: './notification-settings.component.css',
})
export class NotificationSettingsComponent implements OnInit {
  loading = signal(true);
  saving = signal(false);
  subscribing = signal(false);

  isSupported = signal(false);
  isSubscribed = signal(false);
  permissionState = signal<string>('default');
  reminderEnabled = signal(false);
  reminderTime = signal('18:00');

  private supabase = inject(SupabaseService);
  private push = inject(PushNotificationService);
  private toast = inject(ToastService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit() {
    if (this.isBrowser) {
      this.loadSettings();
    }
  }

  async loadSettings() {
    this.loading.set(true);
    try {
      this.isSupported.set(this.push.isSupported);
      this.permissionState.set(this.push.permissionState);
      this.isSubscribed.set(await this.push.isSubscribed());

      const profile = await this.supabase.getProfile();
      if (profile) {
        this.reminderEnabled.set(profile.reminder_enabled ?? false);
        this.reminderTime.set(profile.workout_reminder_time ?? '18:00');
      }
    } catch (err) {
      console.error('Failed to load notification settings', err);
    } finally {
      this.loading.set(false);
    }
  }

  async toggleAndSave() {
    this.subscribing.set(true);
    try {
      if (this.isSubscribed()) {
        await this.push.unsubscribe();
        this.isSubscribed.set(false);
        this.reminderEnabled.set(false);
        await this.supabase.upsertProfile({ reminder_enabled: false });
        this.toast.success(this.i18n.t('notif.disabledToast'));
      } else {
        const sub = await this.push.subscribe();
        if (sub) {
          this.isSubscribed.set(true);
          this.reminderEnabled.set(true);
          this.permissionState.set(this.push.permissionState);
          await this.supabase.upsertProfile({
            reminder_enabled: true,
            workout_reminder_time: this.reminderTime(),
          });
          this.toast.success(this.i18n.t('notif.enabledToast'));
        } else {
          this.toast.error(this.i18n.t('notif.permissionDenied'));
        }
      }
    } catch (err) {
      console.error('Toggle notification error', err);
      this.toast.error(this.i18n.t('notif.error'));
    } finally {
      this.subscribing.set(false);
    }
  }

  async toggleNotifications() {
    this.subscribing.set(true);
    try {
      if (this.isSubscribed()) {
        await this.push.unsubscribe();
        this.isSubscribed.set(false);
        this.reminderEnabled.set(false);
        await this.supabase.upsertProfile({ reminder_enabled: false });
        this.toast.success(this.i18n.t('notif.disabledToast'));
      } else {
        const sub = await this.push.subscribe();
        if (sub) {
          this.isSubscribed.set(true);
          this.reminderEnabled.set(true);
          this.permissionState.set(this.push.permissionState);
          await this.supabase.upsertProfile({
            reminder_enabled: true,
            workout_reminder_time: this.reminderTime(),
          });
          this.toast.success(this.i18n.t('notif.enabledToast'));
        } else {
          this.toast.error(this.i18n.t('notif.permissionDenied'));
        }
      }
    } catch (err) {
      console.error('Toggle notification error', err);
      this.toast.error(this.i18n.t('notif.error'));
    } finally {
      this.subscribing.set(false);
    }
  }

  async saveReminderTime() {
    this.saving.set(true);
    try {
      await this.supabase.upsertProfile({
        reminder_enabled: this.reminderEnabled(),
        workout_reminder_time: this.reminderTime(),
      });
      this.toast.success(this.i18n.t('notif.timeSaved'));
    } catch (err) {
      console.error('Save reminder time error', err);
      this.toast.error(this.i18n.t('notif.timeError'));
    } finally {
      this.saving.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
