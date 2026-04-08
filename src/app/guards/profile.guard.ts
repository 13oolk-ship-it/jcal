import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { I18nService } from '../services/i18n.service';
import { ThemeService } from '../services/theme.service';

export const profileGuard: CanActivateFn = async () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) return true;

  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const i18n = inject(I18nService);
  const themeService = inject(ThemeService);

  try {
    const profile = await supabase.getProfile();
    if (profile?.language) {
      i18n.setLang(profile.language);
    }
    if (profile?.theme) {
      themeService.setTheme(profile.theme);
    }
    if (profile?.weight && profile?.height && profile?.age && profile?.gender && profile?.goal_type && profile?.activity_level) {
      return true;
    }
  } catch {
    // Profile doesn't exist yet
  }

  router.navigate(['/profile-setup']);
  return false;
};
