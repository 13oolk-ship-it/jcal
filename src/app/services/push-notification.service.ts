import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SupabaseService } from './supabase.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private isBrowser: boolean;
  private supabase = inject(SupabaseService);

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  get isSupported(): boolean {
    return this.isBrowser && 'serviceWorker' in navigator && 'PushManager' in window;
  }

  get permissionState(): NotificationPermission | 'unsupported' {
    if (!this.isBrowser || !('Notification' in window)) return 'unsupported';
    return Notification.permission;
  }

  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported) return null;
    try {
      const reg = await navigator.serviceWorker.register('/sw-push.js');
      return reg;
    } catch (err) {
      console.error('SW registration failed:', err);
      return null;
    }
  }

  async subscribe(): Promise<PushSubscription | null> {
    if (!this.isSupported) return null;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const reg = await this.registerServiceWorker();
    if (!reg) return null;

    // Wait for the service worker to be ready
    const ready = await navigator.serviceWorker.ready;

    // Check for existing subscription
    let subscription = await ready.pushManager.getSubscription();
    if (subscription) {
      await this.supabase.savePushSubscription(subscription);
      return subscription;
    }

    // Create new subscription
    const vapidPublicKey = environment.vapidPublicKey;
    subscription = await ready.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });

    await this.supabase.savePushSubscription(subscription);
    return subscription;
  }

  async unsubscribe(): Promise<void> {
    if (!this.isSupported) return;
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
      }
    }
    await this.supabase.removePushSubscription();
  }

  async isSubscribed(): Promise<boolean> {
    if (!this.isSupported) return false;
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return false;
      const subscription = await reg.pushManager.getSubscription();
      return !!subscription;
    } catch {
      return false;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
