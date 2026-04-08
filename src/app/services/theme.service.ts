import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeId = 'violet' | 'dark' | 'ocean' | 'rose' | 'forest';

export interface ThemeOption {
  id: ThemeId;
  icon: string;
  swatch: string;       // Primary color for the swatch preview
  swatchLight: string;   // Light accent for gradient preview
}

export const THEMES: ThemeOption[] = [
  { id: 'violet',  icon: 'auto_awesome', swatch: '#6c5ce7', swatchLight: '#a29bfe' },
  { id: 'dark',    icon: 'dark_mode',    swatch: '#1a1a24', swatchLight: '#a29bfe' },
  { id: 'ocean',   icon: 'water',        swatch: '#0984e3', swatchLight: '#74b9ff' },
  { id: 'rose',    icon: 'local_florist', swatch: '#e84393', swatchLight: '#fd79a8' },
  { id: 'forest',  icon: 'park',         swatch: '#00b894', swatchLight: '#55efc4' },
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private _theme = signal<ThemeId>('violet');

  readonly theme = this._theme.asReadonly();
  readonly themes = THEMES;

  setTheme(id: ThemeId) {
    this._theme.set(id);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', id);
    }
  }
}
