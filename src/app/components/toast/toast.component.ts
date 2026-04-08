import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type" [class.toast-leaving]="toast.leaving"
             (click)="toastService.dismiss(toast.id)">
          <div class="toast-icon-wrap">
            <mat-icon>{{ toast.icon }}</mat-icon>
          </div>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="toastService.dismiss(toast.id); $event.stopPropagation()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: calc(100% - 32px);
      max-width: 420px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 16px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, .12),
        0 2px 8px rgba(0, 0, 0, .06),
        inset 0 1px 0 rgba(255, 255, 255, .15);
      cursor: pointer;
      pointer-events: auto;
      animation: toastSlideIn .35s cubic-bezier(.21, 1.02, .73, 1) forwards;
      transition: opacity .3s ease, transform .3s ease;
    }

    .toast-leaving {
      animation: toastSlideOut .3s cubic-bezier(.55, .08, .68, .53) forwards;
    }

    /* ── Type variants ── */
    .toast-success {
      background: linear-gradient(135deg, rgba(0, 184, 148, .92), rgba(0, 206, 166, .88));
      color: #fff;
    }

    .toast-error {
      background: linear-gradient(135deg, rgba(214, 48, 49, .92), rgba(234, 84, 85, .88));
      color: #fff;
    }

    .toast-warning {
      background: linear-gradient(135deg, rgba(253, 203, 110, .95), rgba(255, 177, 66, .92));
      color: #5a3e00;
    }

    .toast-info {
      background: linear-gradient(135deg, rgba(108, 92, 231, .92), rgba(162, 155, 254, .88));
      color: #fff;
    }

    /* ── Icon ── */
    .toast-icon-wrap {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, .2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toast-icon-wrap mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .toast-warning .toast-icon-wrap {
      background: rgba(90, 62, 0, .12);
    }

    /* ── Message ── */
    .toast-message {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }

    /* ── Close button ── */
    .toast-close {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border: none;
      background: rgba(255, 255, 255, .15);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background .15s;
      padding: 0;
      color: inherit;
    }

    .toast-close:hover {
      background: rgba(255, 255, 255, .3);
    }

    .toast-warning .toast-close {
      background: rgba(90, 62, 0, .1);
    }

    .toast-warning .toast-close:hover {
      background: rgba(90, 62, 0, .2);
    }

    .toast-close mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    /* ── Animations ── */
    @keyframes toastSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(.92);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes toastSlideOut {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-16px) scale(.92);
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
