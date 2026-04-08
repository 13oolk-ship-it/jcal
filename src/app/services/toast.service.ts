import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  icon: string;
  leaving: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const iconMap: Record<ToastType, string> = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };

    const toast: Toast = {
      id: ++this.nextId,
      message,
      type,
      icon: iconMap[type],
      leaving: false,
    };

    this.toasts.update(list => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  success(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 4000) {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration = 3500) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration = 3000) {
    this.show(message, 'info', duration);
  }

  dismiss(id: number) {
    // Mark as leaving for exit animation
    this.toasts.update(list =>
      list.map(t => t.id === id ? { ...t, leaving: true } : t)
    );
    // Remove after animation
    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== id));
    }, 300);
  }
}
